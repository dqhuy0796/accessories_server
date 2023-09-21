import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResponseCode } from "../constant";
import db from "../models";
const { Op } = require("sequelize");
import sequelize from "../config/database";

/** USER */

const handleLogin = async (username, password) => {
    try {
        const user = await db.User.findOne({
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
            message: error.message || error,
        };
    }
};

const handleLogout = async (phone_number) => {
    const t = await sequelize.transaction();
    try {
        await Promise.all([
            db.User.update(
                {
                    last_login: Date.now(),
                },
                {
                    where: {
                        phone_number: phone_number,
                    },
                    transaction: t,
                },
            ),

            db.RefreshToken.destroy({
                where: {
                    phone_number: phone_number,
                },
                transaction: t,
            }),
        ]);

        await t.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Logout successfully.",
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

const handleRefreshTokens = (refreshToken) => {
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

let handleChangePassword = (username, password, newPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { username: username },
                raw: true,
            });

            if (!user) {
                resolve({
                    code: ResponseCode.AUTHENTICATION_ERROR,
                    message: "Incorrect username or password",
                });
            }

            let isValidPassword = bcrypt.compareSync(password, user.password);

            if (!isValidPassword) {
                resolve({
                    code: ResponseCode.AUTHENTICATION_ERROR,
                    message: "Incorrect username or password",
                });
            } else {
                let hashedPassword = hashPassword(newPassword);
                await db.User.update(
                    {
                        password: hashedPassword,
                    },
                    {
                        where: { username: username },
                    },
                );
                resolve({
                    code: ResponseCode.SUCCESS,
                    message: "Password has been changed.",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

/** SUPPORTER METHODS */

let hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

module.exports = {
    handleLogin,
    handleLogout,
    handleChangePassword,
    handleRefreshTokens,
};
