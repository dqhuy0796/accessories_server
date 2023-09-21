import bcrypt from "bcryptjs";
import db from "../models";
import sequelize from "../config/database";
import { ResponseCode } from "../constant";
const { Op } = require("sequelize");

const handleGetRoles = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const roles = await db.Role.findAll();

            if (roles) {
                resolve({
                    code: ResponseCode.SUCCESS,
                    message: "get roles successfully",
                    result: roles,
                });
            }
            resolve({
                code: ResponseCode.FILE_NOT_FOUND,
                message: "get roles failure",
            });
        } catch (error) {
            reject(error);
        }
    });
};

/** GET USER(S) */

const handleGetUsers = async (role_id, page) => {
    try {
        const currentPage = page && !_.isNaN(page) ? page : 1;

        if (role_id) {
            const { count, rows } = await db.UserView.findAndCountAll({
                where: {
                    role_id,
                },
                attributes: {
                    exclude: ["password"],
                },
                order: [["id", "DESC"]],
                limit: 12,
                offset: (currentPage - 1) * 12,
            });

            if (rows) {
                return {
                    code: ResponseCode.SUCCESS,
                    message: "Get user(s) successfully.",
                    page: currentPage,
                    total_pages: Math.ceil(count / 12),
                    total_results: count,
                    result: rows,
                };
            }

            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Get user(s) failure.",
            };
        }

        const { count, rows } = await db.UserView.findAndCountAll({
            attributes: {
                exclude: ["password"],
            },
            order: [["id", "DESC"]],
            limit: 12,
            offset: (currentPage - 1) * 12,
        });

        if (rows) {
            return {
                code: ResponseCode.SUCCESS,
                message: "Get user(s) successfully.",
                page: currentPage,
                total_pages: Math.ceil(count / 12),
                total_results: count,
                result: rows,
            };
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "Get user(s) failure.",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: error.message || error,
        };
    }
};

const handleGetUserByUsername = async (username) => {
    try {
        const user = await db.UserView.findOne({
            attributes: {
                exclude: ["avatar_url"],
            },
            where: {
                [Op.or]: [
                    {
                        phone_number: username,
                    },
                    {
                        email: username,
                    },
                ],
            },
        });

        if (user) {
            const avatar = await db.Image.findOne({
                attributes: {
                    exclude: ["id", "target_id", "target_type"],
                },
                where: {
                    target_id: user.id,
                    target_type: "avatar",
                },
            });

            return {
                code: ResponseCode.SUCCESS,
                message: "Get user successfully.",
                result: {
                    ...user,
                    avatar,
                },
            };
        }
        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "Invalid user.",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: error.message || error,
        };
    }
};

/** CREATE NEW USER */

const handleCreateUser = async (user) => {
    try {
        const existedPhoneNumber = await db.User.findOne({
            where: {
                phone_number: user.phone_number,
            },
        });

        if (existedPhoneNumber) {
            return {
                code: ResponseCode.DATABASE_ERROR,
                message: "Phone number already in use.",
            };
        }

        const existedEmail = await db.User.findOne({
            where: {
                email: user.email,
            },
        });

        if (existedEmail) {
            return {
                code: ResponseCode.DATABASE_ERROR,
                message: "Email already in use.",
            };
        }

        const hashedPassword = hashPassword(user.password);
        const convertedAddress = handleConvertAddressType(user.address);
        await db.User.create({
            phone_number: user.phone_number,
            email: user.email,
            password: hashedPassword,
            name: user?.name || user.phone_number,
            avatar_url: user?.avatar_url,
            birth: user?.birth,
            bio: user?.bio,
            address: convertedAddress,
            last_login: Date.now(),
            role_id: user?.role_id || 3,
        });

        return {
            code: ResponseCode.SUCCESS,
            message: "Create user successfully.",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: error.message || error,
        };
    }
};

/** UPDATE USER */
const handleUpdateUser = async (user) => {
    const t = await sequelize.transaction();
    try {
        const existedUser = await db.User.findOne({
            where: {
                phone_number: user.phone_number,
                email: user.email,
            },
        });

        if (existedUser) {
            const convertedAddress = handleConvertAddressType(user.address);

            db.User.update(
                {
                    name: user.name,
                    birth: user.birth,
                    bio: user.bio,
                    address: convertedAddress,
                },
                {
                    where: {
                        phone_number: user.phone_number,
                        email: user.email,
                    },
                    transaction: t,
                },
            );

            if (user.avatar) {
                const [image, created] = await db.Image.findOrCreate({
                    where: {
                        target_id: user.id,
                        target_type: "avatar",
                    },
                    defaults: {
                        target_id: user.id,
                        target_type: "avatar",
                        ...user.avatar,
                    },
                    transaction: t,
                });

                if (!created) {
                    await db.Image.update(
                        {
                            public_id: user.avatar.public_id,
                            secure_url: user.avatar.secure_url,
                            thumbnail_url: user.avatar.thumbnail_url,
                        },
                        {
                            where: {
                                target_id: user.id,
                                target_type: "avatar",
                            },
                            transaction: t,
                        },
                    );
                }
            }

            await t.commit();

            return {
                code: ResponseCode.SUCCESS,
                message: "Update user successfully.",
            };
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "Invalid user account.",
        };
    } catch (error) {
        await t.rollback();
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: error.message || error,
        };
    }
};

/** DELETE USER */
const handleDeleteUser = async (user) => {
    try {
        const existed = await db.User.findOne({
            where: {
                id: user.id,
                phone_number: user.phone_number,
                email: user.email,
            },
        });

        if (!existed) {
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Invalid user account.",
            };
        }

        await db.User.destroy({
            where: {
                id: user.id,
                phone_number: user.phone_number,
                email: user.email,
            },
        });

        return {
            code: ResponseCode.SUCCESS,
            message: "Delete user successfully.",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: error.message || error,
        };
    }
};

/** SUPPORTER METHODS */

let isNumeric = (input) => {
    return !isNaN(input);
};

const handleConvertAddressType = (address) => {
    const values = [address.location, address.ward, address.district, address.province];
    return values.join(" - ");
};

let hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

module.exports = {
    handleGetRoles,
    handleGetUsers,
    handleGetUserByUsername,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
};
