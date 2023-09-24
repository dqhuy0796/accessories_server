import bcrypt from "bcryptjs";
import db from "../models";
import sequelize from "../config/database";
import { ResponseCode } from "../constant";
import _ from "lodash";
const { Op } = require("sequelize");

const handleGetRoles = async (role_id) => {
    try {
        const roles = await db.Role.findAll({
            where: {
                id: {
                    [Op.gt]: role_id ?? 5,
                },
            },
        });

        if (roles.length > 0) {
            return {
                code: ResponseCode.SUCCESS,
                message: "get roles successfully",
                result: roles,
            };
        }
        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "get roles failure",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleCountUsers = async (role_id) => {
    try {
        const roleId = role_id && !_.isNaN(role_id) ? role_id : 2;

        const countByRole = await db.CountRoleUserView.findAll({
            where: {
                id: {
                    [Op.gt]: roleId,
                },
            },
        });

        if (countByRole) {
            return {
                code: ResponseCode.SUCCESS,
                message: "get users count by role successfully",
                result: countByRole,
            };
        }
        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "get users count by role failure",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleGetUsers = async (role_id, slug, page) => {
    try {
        const currentPage = page && !_.isNaN(page) ? page : 1;

        if (slug !== "all") {
            const { count, rows } = await db.UserView.findAndCountAll({
                where: {
                    role_slug: slug,
                    role_id: {
                        [Op.gt]: Number(role_id) ?? 2,
                    },
                },
                attributes: {
                    exclude: ["password", "role_slug"],
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

        const roleId = role_id && !_.isNaN(role_id) ? role_id : 2;

        const { count, rows } = await db.UserView.findAndCountAll({
            where: {
                role_id: {
                    [Op.gt]: roleId,
                },
            },
            attributes: {
                exclude: ["password", "role_slug"],
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
            message: "Error occurs, check again!",
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
            message: "Error occurs, check again!",
        };
    }
};

const handleCreateUser = async (user) => {
    const t = sequelize.transaction();
    try {
        const existedUser = await db.User.findOne({
            where: {
                [Op.or]: [
                    {
                        phone_number: user.phone_number,
                    },
                    {
                        email: user.email,
                    },
                ],
            },
        });

        if (existedUser) {
            return {
                code: ResponseCode.DATABASE_ERROR,
                message: "Phone number or email already in use.",
            };
        }

        const hashedPassword = hashPassword(user.password);
        const convertedAddress = handleConvertAddressType(user.address);
        const createdUser = await db.User.create({
            phone_number: user.phone_number,
            email: user.email,
            password: hashedPassword,
            name: user.name ?? user.phone_number,
            birth: user.birth ?? null,
            bio: user.bio ?? null,
            address: convertedAddress,
            last_login: null,
            role_id: user.role_id ?? 3,
        });

        if (createdUser) {
            if (user.avatar) {
                await db.Image.create({
                    target_id: createdUser.id,
                    target_type: "avatar",
                    public_id: user.avatar.public_id,
                    secure_url: user.avatar.secure_url,
                    thumbnail_url: user.avatar.thumbnail_url,
                });
            }
            return {
                code: ResponseCode.SUCCESS,
                message: "Create user successfully.",
            };
        }
        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "Create user failure.",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

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
                        target_id: existedUser.id,
                        target_type: "avatar",
                    },
                    defaults: {
                        target_id: existedUser.id,
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
                                target_id: existedUser.id,
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
            message: "Error occurs, check again!",
        };
    }
};

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
            message: "Error occurs, check again!",
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
    handleCountUsers,
    handleGetUsers,
    handleGetUserByUsername,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
};
