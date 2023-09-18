import bcrypt from "bcryptjs";
import db from "../models";
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

const handleGetUsers = async (username) => {
    try {
        if (username) {
            const users = await db.UserView.findAll({
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
                attributes: { exclude: ["password"] },
                order: [["id", "DESC"]],
            });

            return {
                code: ResponseCode.SUCCESS,
                message: "Get user(s) successfully.",
                result: users,
            };
        }

        const users = await db.UserView.findAll({
            attributes: {
                exclude: ["password"],
            },
            order: [["id", "DESC"]],
        });

        return {
            code: ResponseCode.SUCCESS,
            message: "Get user(s) successfully.",
            result: users,
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: error.message || error,
        };
    }
};

const handleGetUserById = async (userId) => {
    try {
        const user = await db.UserView.findOne({
            attributes: {
                exclude: ["password"],
            },
            order: [["id", "DESC"]],
            where: {
                id: userId,
            },
        });

        return {
            code: ResponseCode.SUCCESS,
            message: "Get user successfully.",
            result: user,
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
            birth: user?.birth || "",
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
    try {
        const existed = await db.User.findOne({
            where: {
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

        const convertedAddress = handleConvertAddressType(user.address);

        await db.User.update(
            {
                name: user.name,
                birth: user.birth,
                role_id: user.role_id,
                address: convertedAddress,
            },
            {
                where: {
                    phone_number: user.phone_number,
                    email: user.email,
                },
            },
        );

        return {
            code: ResponseCode.SUCCESS,
            message: "Update user successfully.",
        };
    } catch (error) {
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
    handleGetUserById,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
};
