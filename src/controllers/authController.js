const ResponseCode = require("../constant").ResponseCode;
const userAuthService = require("../services/userAuthService");
const customerAuthService = require("../services/customerAuthService");

/** -------------------------------- USER AUTH -------------------------------- */

const userLogin = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        const data = await userAuthService.handleLogin(username, password);
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

const userLogout = async (req, res) => {
    const { phone_number } = req.body;

    if (phone_number) {
        const data = await userAuthService.handleLogout(phone_number);
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

const userRefresh = async (req, res) => {
    const token = req.body["x-refresh-token"];

    if (token) {
        const data = await userAuthService.handleRefreshTokens(token);
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

const updateProfile = async (req, res) => {
    const { name, phone_number, email, avatar, address, birth, bio } = req.body;

    if (name && phone_number && email && address) {
        const data = await userAuthService.handleUpdateProfile({
            name,
            phone_number,
            email,
            avatar,
            address,
            birth,
            bio,
        });
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

let changeUserPassword = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let newPassword = req.body.newPassword;

    if (!username || !password || !newPassword) {
        return res.status(500).json({
            code: ResponseCode.AUTHENTICATION_ERROR,
            message: "Missing infomation.",
        });
    }

    let data = await userAuthService.handleChangePassword(username, password, newPassword);

    return res.status(200).json(data);
};

/** -------------------------------- CUSTOMER AUTH -------------------------------- */

let customerLogin = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        const data = await customerAuthService.handleLogin(username, password);
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

const customerRegister = async (req, res) => {
    const { phone_number, email, password, confirm_password, name, address } = req.body;

    if (phone_number && email && password && confirm_password && name && address) {
        const data = await customerAuthService.handleRegister({
            phone_number,
            email,
            password,
            confirm_password,
            name,
            address,
        });
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

const customerUpdateProfile = async (req, res) => {
    const { email, phoneNumber, name, birth } = req.body;

    if (!phoneNumber || !email || !name || !birth) {
        return res.status(500).json({
            code: ResponseCode.AUTHENTICATION_ERROR,
            message: "Missing information.",
        });
    }

    const data = await customerAuthService.handleUpdateProfile({
        email,
        phoneNumber,
        name,
        birth,
    });

    return res.status(200).json(data);
};

let customerVerifyRefreshToken = async (req, res) => {
    const token = req.body["x-refresh-token"];

    if (!token) {
        return res.status(403).json({
            code: ResponseCode.AUTHORIZATION_ERROR,
            message: "Forbidden. Invalid refresh token.",
        });
    }

    let data = await customerAuthService.handleVerifyRefreshToken(token);

    return res.status(200).json(data);
};

let customerRefreshTokens = async (req, res) => {
    const token = req.body["x-refresh-token"];

    if (!token) {
        return res.status(403).json({
            code: ResponseCode.AUTHORIZATION_ERROR,
            message: "Forbidden. Invalid refresh token.",
        });
    }

    let data = await customerAuthService.handleRefreshTokens(token);

    return res.status(200).json(data);
};

let changeCustomerPassword = async (req, res) => {
    let phoneNumber = req.body.phoneNumber;
    let password = req.body.password;
    let newPassword = req.body.newPassword;

    if (!phoneNumber || !password || !newPassword) {
        return res.status(500).json({
            code: ResponseCode.AUTHENTICATION_ERROR,
            message: "Missing infomation.",
        });
    }

    let data = await customerAuthService.handleChangePassword(phoneNumber, password, newPassword);

    return res.status(200).json(data);
};

export default {
    userLogin,
    userLogout,
    userRefresh,
    updateProfile,
    changeUserPassword,
    customerLogin,
    customerRegister,
    customerUpdateProfile,
    customerRefreshTokens,
    customerVerifyRefreshToken,
    changeCustomerPassword,
};
