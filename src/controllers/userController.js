import { ResponseCode } from "../constant";
import userService from "../services/userService";

const getRoles = async (req, res) => {
    const data = await userService.handleGetRoles();
    return res.status(200).json(data);
};

const getUser = async (req, res) => {
    const { username, role_id, page } = req.query;

    if (username) {
        const data = await userService.handleGetUserByUsername(username);
        return res.status(200).json(data);
    }
    const data = await userService.handleGetUsers(role_id, page);
    return res.status(200).json(data);
};

const createUser = async (req, res) => {
    const { password, name, phone_number, email, avatar_url, address, role_id, birth, bio } = req.body;

    if (password && name && phone_number && email && address && role_id && birth) {
        const data = await userService.handleCreateUser({
            password,
            name,
            phone_number,
            email,
            address,
            role_id,
            birth,
            bio,
            avatar_url,
        });
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

const updateUser = async (req, res) => {
    const { id, name, phone_number, email, avatar, address, role_id, birth, bio } = req.body;

    if (id && name && phone_number && email && address && role_id) {
        const data = await userService.handleUpdateUser({
            id,
            name,
            phone_number,
            email,
            address,
            role_id,
            birth,
            bio,
            avatar,
        });
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

let deleteUser = async (req, res) => {
    const { id, phone_number, email } = req.body;

    if (id && phone_number && email) {
        const data = await userService.handleDeleteUser({
            id,
            phone_number,
            email,
        });
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

export default {
    getRoles,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
