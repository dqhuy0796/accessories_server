import { ResponseCode } from "../constant/index.js";
import orderService from "../services/orderService.js";

const getPaymentMethods = async (req, res) => {
    const data = await orderService.handleGetPaymentMethods();
    return res.status(200).json(data);
};

const getOrder = async (req, res) => {
    const { order_uuid } = req.query;

    if (order_uuid) {
        const data = await orderService.handleGetOrderByUuid(order_uuid);
        return res.status(200).json(data);
    }

    return res.status(500).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s).",
    });
};

let createOrder = async (req, res) => {
    const { customerPhoneNumber, items, note, paymentDetails, paymentMethod, shippingAddress } = req.body;

    if (customerPhoneNumber && items && paymentDetails && paymentMethod && shippingAddress) {
        const data = await orderService.handleCreateOrder({
            customerPhoneNumber,
            items,
            note,
            paymentDetails,
            paymentMethod,
            shippingAddress,
        });
        return res.status(200).json(data);
    }

    return res.status(500).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s).",
    });
};

let confirmOrder = async (req, res) => {
    if (req.body.uuid) {
        let data = await orderService.handleConfirmOrder(req.body.uuid);

        return res.status(200).json({
            code: data.code,
            message: data.message,
        });
    }
    return res.status(200).json({
        code: 1,
        message: "missing parameter(s)",
    });
};

let deliveryOrder = async (req, res) => {
    if (req.body.uuid) {
        let data = await orderService.handleDeliveryOrder(req.body.uuid);

        return res.status(200).json({
            code: data.code,
            message: data.message,
        });
    }
    return res.status(200).json({
        code: 1,
        message: "missing parameter(s)",
    });
};

let finishedOrder = async (req, res) => {
    if (req.body.uuid) {
        let data = await orderService.handleFinishedOrder(req.body.uuid);

        return res.status(200).json({
            code: data.code,
            message: data.message,
        });
    }
    return res.status(200).json({
        code: 1,
        message: "missing parameter(s)",
    });
};

let cancelOrder = async (req, res) => {
    if (req.body.uuid) {
        let data = await orderService.handleCancelOrder(req.body.uuid);

        return res.status(200).json({
            code: data.code,
            message: data.message,
        });
    }
    return res.status(200).json({
        code: 1,
        message: "missing parameter(s)",
    });
};

let deleteOrder = async (req, res) => {
    if (req.body.id) {
        let data = await orderService.handleDeleteOrder(req.body.id);
        console.log(data);
        return res.status(200).json({
            code: data.code,
            message: data.message,
        });
    }
    return res.status(200).json({
        code: 1,
        message: "missing parameter(s)",
    });
};

export default {
    getPaymentMethods,
    getOrder,
    createOrder,
    confirmOrder,
    deliveryOrder,
    finishedOrder,
    cancelOrder,
    deleteOrder,
};
