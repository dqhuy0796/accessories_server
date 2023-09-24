import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResponseCode } from "../constant";
import db from "../models";
const { Op } = require("sequelize");
import sequelize from "../config/database";
import _ from "lodash";

/** CUSTOMER */

const handleLogin = async (username, password) => {
    try {
        const user = await db.User.findOne({
            where: {
                [Op.or]: [
                    {
                        phone_number: username,
                        role_id: 3,
                    },
                    {
                        email: username,
                        role_id: 3,
                    },
                ],
            },
        });

        if (!user) {
            return {
                code: ResponseCode.AUTHENTICATION_ERROR,
                message: "Incorrect Username or Password",
            };
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!isValidPassword) {
            return {
                code: ResponseCode.AUTHENTICATION_ERROR,
                message: "Incorrect Username or Password",
            };
        }

        const avatar = await db.Image.findOne({
            attributes: {
                exclude: ["id", "target_id", "target_type"],
            },
            where: {
                target_id: user.id,
                target_type: "avatar",
            },
        });

        const accessToken = handleGenerateAccessToken(user);

        const refreshToken = await handleGenerateRefreshToken(user);

        delete user.password;

        return {
            code: ResponseCode.SUCCESS,
            message: "Authentication successfully",
            result: {
                ...user,
                avatar,
            },
            accessToken,
            refreshToken,
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleRegister = async (user) => {
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

        if (!_.isEqual(user.password, user.confirm_password)) {
            return {
                code: ResponseCode.DATABASE_ERROR,
                message: "Confirm password do not match.",
            };
        }

        const hashedPassword = hashPassword(user.password);
        const createdUser = await db.User.create({
            phone_number: user.phone_number,
            email: user.email,
            password: hashedPassword,
            name: user.name ?? user.phone_number,
            address: user.address,
            last_login: null,
            birth: null,
            role_id: 3,
            bio: null,
        });

        if (createdUser) {
            delete createdUser.password;
            const accessToken = handleGenerateAccessToken(user);
            const refreshToken = await handleGenerateRefreshToken(user);
            return {
                code: ResponseCode.SUCCESS,
                message: "Register successfully.",
                result: createdUser,
                accessToken,
                refreshToken,
            };
        }

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "Register unsuccessfully.",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

/** TOKEN */
const handleRefreshTokens = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.NODE_REFRESH_TOKEN_SECRET_KEY, async (error, data) => {
            if (error) {
                reject({
                    code: ResponseCode.AUTHORIZATION_ERROR,
                    message: "Forbidden. Invalid refresh token.",
                });
            } else {
                try {
                    const existedRefreshToken = await db.RefreshToken.findOne({
                        where: {
                            phone_number: data.phone_number,
                        },
                    });

                    if (existedRefreshToken && existedRefreshToken.token === refreshToken) {
                        const newAccessToken = handleGenerateAccessToken(data);
                        const newRefreshToken = await handleGenerateRefreshToken(data);

                        resolve({
                            code: ResponseCode.SUCCESS,
                            message: "Refresh successfully.",
                            accessToken: newAccessToken,
                            refreshToken: newRefreshToken,
                        });
                    } else {
                        reject({
                            code: ResponseCode.AUTHORIZATION_ERROR,
                            message: "Forbidden. Invalid refresh token.",
                        });
                    }
                } catch (err1) {
                    console.error(err1);
                    reject({
                        code: ResponseCode.INTERNAL_SERVER_ERROR,
                        message: "An error occurred.",
                    });
                }
            }
        });
    }).catch((err2) => {
        console.log(err2);
        return err2;
    });
};

const handleGenerateAccessToken = (user) => {
    const accessToken = jwt.sign(
        {
            time: Date(),
            email: user.email,
            phone_number: user.phone_number,
            role_id: user.role_id,
        },
        process.env.NODE_ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.NODE_ACCESS_TOKEN_EXPIRES_IN,
        },
    );

    return accessToken;
};

const handleGenerateRefreshToken = async (user) => {
    try {
        const newRefreshToken = jwt.sign(
            {
                time: Date(),
                email: user.email,
                phone_number: user.phone_number,
                role_id: user.role_id,
            },
            process.env.NODE_REFRESH_TOKEN_SECRET_KEY,
            {
                expiresIn: process.env.NODE_REFRESH_TOKEN_EXPIRES_IN,
            },
        );
        const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        const newRecords = {
            phone_number: user.phone_number,
            token: newRefreshToken,
            expirationDate,
        };

        const [refreshToken, created] = await db.RefreshToken.findOrCreate({
            where: {
                phone_number: user.phone_number,
            },
            defaults: newRecords,
        });

        if (!created) {
            await db.RefreshToken.update(
                {
                    token: newRefreshToken,
                    expirationDate: expirationDate,
                },
                {
                    where: {
                        phone_number: user.phone_number,
                    },
                },
            );
        }

        return newRefreshToken;
    } catch (error) {
        throw error;
    }
};

/** SUPPORTER METHODS */

let isExistPhone = (currentPhone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customer = await db.Customer.findOne({
                where: {
                    phoneNumber: currentPhone,
                },
            });
            if (customer) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

module.exports = {
    handleLogin,
    handleRegister,
    handleRefreshTokens,
};
