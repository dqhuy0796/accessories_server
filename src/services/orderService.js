import db from "../models";
import { OrderStateCode, ResponseCode } from "../constant";
import sequelize from "../config/database";
import _ from "lodash";

const handleGetPaymentMethods = async () => {
    try {
        const paymentMethods = await db.PaymentMethod.findAll();
        if (paymentMethods) {
            return {
                code: ResponseCode.SUCCESS,
                message: "get payment methods successfully",
                result: paymentMethods,
            };
        }
        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "get payment methods failure",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleGetAllOrders = async (status_id, page) => {
    const t = sequelize.transaction();
    const currentPage = page && !_.isNaN(page) ? page : 1;
    try {
        const { count, rows: orders } = await db.Order.findAndCountAll({
            order: [["id", "DESC"]],
            limit: 12,
            offset: (currentPage - 1) * 12,
        });

        if (count > 0) {
            const [orderDetails, shippingAddresses, paymentMethods, orderStatuses] = await Promise.all([
                db.OrderDetail.findAll({
                    where: {
                        order_uuid: orders.map((order) => order.order_uuid),
                    },
                }),
                db.ShippingAddress.findAll({
                    where: {
                        id: orders.map((order) => order.shipping_address_id),
                    },
                }),
                db.PaymentMethod.findAll(),
                db.Status.findAll(),
            ]);

            const result = orders.map((order) => {
                const { id, shipping_address_id, payment_method_id, status_id, ...rest } = order;

                const orderStatus = orderStatuses.find((status) => status.id === status_id);
                const orderDetail = orderDetails.filter((detail) => detail.order_uuid === order.order_uuid);
                const shippingAddress = shippingAddresses.find((address) => address.id === shipping_address_id);
                const paymentMethod = paymentMethods.find((method) => method.id === payment_method_id);

                return {
                    ...rest,
                    status: orderStatus,
                    items: orderDetail,
                    shipping_address: shippingAddress,
                    payment_method: paymentMethod,
                };
            });

            return {
                code: ResponseCode.SUCCESS,
                message: `Retrieved orders successfully`,
                page: currentPage,
                total_pages: Math.ceil(count / 12),
                total_results: count,
                result,
            };
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: `Orders not found.`,
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred while retrieving the orders.",
        };
    }
};

const handleGetOneOrderByUuid = async (order_uuid) => {
    const t = sequelize.transaction();
    try {
        const order = await db.Order.findOne({
            where: {
                order_uuid,
            },
        });

        if (order) {
            const { id, shipping_address_id, payment_method_id, status_id, ...rest } = order;

            const [order_status, order_details, shipping_address, payment_method, history] = await Promise.all([
                db.Status.findOne({
                    where: {
                        id: status_id,
                    },
                }),
                db.OrderDetail.findAll({
                    where: {
                        order_uuid,
                    },
                }),
                db.ShippingAddress.findOne({
                    where: {
                        id: shipping_address_id,
                    },
                }),
                db.PaymentMethod.findOne({
                    where: {
                        id: payment_method_id,
                    },
                }),
                db.HistoryOrderUpdateStatusView.findAll({
                    where: {
                        order_uuid,
                    },
                }),
            ]);

            return {
                code: ResponseCode.SUCCESS,
                message: `Retrieved order ${order_uuid} successfully`,
                result: {
                    ...rest,
                    status: order_status,
                    items: order_details,
                    shipping_address,
                    payment_method,
                    history,
                },
            };
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: `Order ${order_uuid} not found.`,
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred while retrieving the order.",
        };
    }
};

const handleGetOrdersByUuids = async (encodedUuids) => {
    const t = sequelize.transaction();
    try {
        const decodedUuids = decodeURIComponent(encodedUuids);

        if (_.isEmpty(decodedUuids)) {
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: `Orders not found.`,
            };
        }

        const uuids = decodedUuids.split(",");
        const orders = await db.Order.findAll({
            where: {
                order_uuid: uuids,
            },
        });

        if (orders.length > 0) {
            const [orderDetails, orderStatuses, shippingAddresses, paymentMethods] = await Promise.all([
                db.OrderDetail.findAll({
                    where: {
                        order_uuid: uuids,
                    },
                }),
                db.Status.findAll({
                    where: {
                        id: orders.map((order) => order.status_id),
                    },
                }),
                db.ShippingAddress.findAll({
                    where: {
                        id: orders.map((order) => order.shipping_address_id),
                    },
                }),
                db.PaymentMethod.findAll({
                    where: {
                        id: orders.map((order) => order.payment_method_id),
                    },
                }),
            ]);

            const result = orders.map((order) => {
                const { id, shipping_address_id, payment_method_id, status_id, ...rest } = order;

                const orderStatus = orderStatuses.find((status) => status.id === status_id);
                const orderDetail = orderDetails.filter((detail) => detail.order_uuid === order.order_uuid);
                const shippingAddress = shippingAddresses.find((address) => address.id === shipping_address_id);
                const paymentMethod = paymentMethods.find((method) => method.id === payment_method_id);

                return {
                    ...rest,
                    status: orderStatus,
                    items: orderDetail,
                    shipping_address: shippingAddress,
                    payment_method: paymentMethod,
                };
            });

            return {
                code: ResponseCode.SUCCESS,
                message: `Retrieved orders successfully`,
                result,
            };
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: `Orders not found.`,
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred while retrieving the orders.",
        };
    }
};

const handleGetOrdersByUserPhoneNumber = async (phone_number) => {
    const t = sequelize.transaction();
    try {
        const user = await db.User.findOne({
            where: {
                phone_number,
            },
        });

        if (user) {
            const orders = await db.Order.findAll({
                where: {
                    customer_phone_number: user.phone_number,
                },
            });

            if (orders.length > 0) {
                const [orderDetails, orderStatuses, shippingAddresses, paymentMethods] = await Promise.all([
                    db.OrderDetail.findAll({
                        where: {
                            order_uuid: orders.map((order) => order.order_uuid),
                        },
                    }),
                    db.Status.findAll({
                        where: {
                            id: orders.map((order) => order.status_id),
                        },
                    }),
                    db.ShippingAddress.findAll({
                        where: {
                            id: orders.map((order) => order.shipping_address_id),
                        },
                    }),
                    db.PaymentMethod.findAll({
                        where: {
                            id: orders.map((order) => order.payment_method_id),
                        },
                    }),
                ]);

                const result = orders.map((order) => {
                    const { id, shipping_address_id, payment_method_id, status_id, ...rest } = order;

                    const orderDetail = orderDetails.filter((detail) => detail.order_uuid === order.order_uuid);
                    const orderStatus = orderStatuses.find((status) => status.id === status_id);
                    const shippingAddress = shippingAddresses.find((address) => address.id === shipping_address_id);
                    const paymentMethod = paymentMethods.find((method) => method.id === payment_method_id);

                    return {
                        ...rest,
                        status: orderStatus,
                        items: orderDetail,
                        shipping_address: shippingAddress,
                        payment_method: paymentMethod,
                    };
                });

                return {
                    code: ResponseCode.SUCCESS,
                    message: `Retrieved orders successfully`,
                    result,
                };
            }
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: `Orders not found.`,
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred while retrieving the orders.",
        };
    }
};

const handleCreateOrder = async (order) => {
    const t = await sequelize.transaction();

    try {
        const thisMoment = new Date();
        const datetimeUuid = thisMoment.valueOf();

        const { customerPhoneNumber, items, note, paymentDetails, paymentMethod, shippingAddress } = order;

        const [shipping_adddress, created] = await db.ShippingAddress.findOrCreate({
            where: {
                ...shippingAddress,
            },
            defaults: shippingAddress,
            transaction: t,
        });

        const orderDataToInsert = {
            order_uuid: datetimeUuid,
            customer_phone_number: customerPhoneNumber,
            shipping_address_id: shipping_adddress.id,
            payment_method_id: paymentMethod.id,
            ...paymentDetails,
            status_id: 1,
            note,
        };

        const orderItemsToInsert = items.map(({ id, name, slug, price, quantity, feature_image_url }) => ({
            order_uuid: datetimeUuid,
            product_id: id,
            slug,
            name,
            price,
            quantity,
            feature_image_url,
        }));

        const historyDataToInsert = {
            order_uuid: datetimeUuid,
            employee_id: null,
            status_id: 1,
            description: `Khách ${customerPhoneNumber} đặt hàng`,
        };

        await Promise.all([
            db.Order.create(orderDataToInsert, { transaction: t }),
            db.OrderDetail.bulkCreate(orderItemsToInsert, { transaction: t }),
            db.HistoryOrderUpdate.create(historyDataToInsert, { transaction: t }),
        ]);

        await t.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Create order successfully",
            result: datetimeUuid,
        };
    } catch (error) {
        await t.rollback();

        console.log(error);

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred during the transaction.",
        };
    }
};

let handleConfirmOrder = (uuid) => {
    return new Promise(async (resolve, reject) => {
        let data = {};
        try {
            let targetOrder = await db.Order.findOne({
                where: { orderUuid: uuid },
            });
            if (targetOrder) {
                const thisMoment = new Date();
                const stateArray = JSON.parse(targetOrder.state);
                if (stateArray[stateArray.length - 1].code < 1) {
                    const newStateArray = [
                        ...stateArray,
                        {
                            code: 1,
                            description: "Đã xác nhận",
                            time: thisMoment.toISOString(),
                        },
                    ];
                    await db.Order.update(
                        {
                            state: JSON.stringify(newStateArray),
                        },
                        {
                            where: { orderUuid: uuid },
                        },
                    );
                    data.code = 0;
                    data.message = "this order has been confirmed";
                }
            } else {
                data.code = 2;
                data.message = "invalid order";
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

let handleDeliveryOrder = (uuid) => {
    return new Promise(async (resolve, reject) => {
        let data = {};
        try {
            let targetOrder = await db.Order.findOne({
                where: { orderUuid: uuid },
            });
            if (targetOrder) {
                const thisMoment = new Date();
                const stateArray = JSON.parse(targetOrder.state);
                if (stateArray[stateArray.length - 1].code < 2) {
                    const newStateArray = [
                        ...stateArray,
                        {
                            code: 2,
                            description: "Đang giao hàng",
                            time: thisMoment.toISOString(),
                        },
                    ];
                    await db.Order.update(
                        {
                            state: JSON.stringify(newStateArray),
                        },
                        {
                            where: { orderUuid: uuid },
                        },
                    );
                    data.code = 0;
                    data.message = "this order being delivery";
                }
            } else {
                data.code = 2;
                data.message = "invalid order";
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

let handleFinishedOrder = (uuid) => {
    return new Promise(async (resolve, reject) => {
        let data = {};
        try {
            let targetOrder = await db.Order.findOne({
                where: { orderUuid: uuid },
            });
            if (targetOrder) {
                const thisMoment = new Date();
                const stateArray = JSON.parse(targetOrder.state);
                if (stateArray[stateArray.length - 1].code === 2) {
                    const newStateArray = [
                        ...stateArray,
                        {
                            code: 3,
                            description: "Giao hàng thành công",
                            time: thisMoment.toISOString(),
                        },
                    ];
                    await db.Order.update(
                        {
                            state: JSON.stringify(newStateArray),
                        },
                        {
                            where: { orderUuid: uuid },
                        },
                    );
                    data.code = 0;
                    data.message = "delivery success";
                }
            } else {
                data.code = 2;
                data.message = "invalid order";
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

let handleCancelOrder = (uuid) => {
    return new Promise(async (resolve, reject) => {
        let data = {};
        try {
            let targetOrder = await db.Order.findOne({
                where: { orderUuid: uuid },
            });
            if (targetOrder) {
                const thisMoment = new Date();
                const stateArray = JSON.parse(targetOrder.state);
                if (stateArray[stateArray.length - 1].code !== 4) {
                    const newStateArray = [
                        ...stateArray,
                        {
                            code: 4,
                            description: "Đã hủy",
                            time: thisMoment.toISOString(),
                        },
                    ];
                    await db.Order.update(
                        {
                            state: JSON.stringify(newStateArray),
                        },
                        {
                            where: { orderUuid: uuid },
                        },
                    );
                    data.code = 0;
                    data.message = "this order has been cancelled";
                }
            } else {
                data.code = 2;
                data.message = "invalid order";
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

let handleDeleteOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        let data = {};
        try {
            let targetOrder = await db.Order.findOne({
                where: { id: orderId },
            });
            if (targetOrder) {
                await db.Order.destroy({
                    where: { id: orderId },
                });
                data.code = 0;
                data.message = "delete order success";
            } else {
                data.code = 1;
                data.message = "invalid order";
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleGetPaymentMethods,
    handleGetAllOrders,
    handleGetOneOrderByUuid,
    handleGetOrdersByUuids,
    handleGetOrdersByUserPhoneNumber,
    handleCreateOrder,
    handleConfirmOrder,
    handleDeliveryOrder,
    handleFinishedOrder,
    handleCancelOrder,
    handleDeleteOrder,
};
