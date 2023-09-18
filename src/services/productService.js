import _ from "lodash";
import { ResponseCode } from "../constant";
import db from "../models";
import sequelize from "../config/database";
import imageService from "./imageService";

const handleGetCategories = async () => {
    try {
        const categories = await db.Category.findAll();
        if (categories) {
            return {
                code: ResponseCode.SUCCESS,
                message: "get categories successfully",
                result: categories,
            };
        }
        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "get categories failure",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: error.message || error,
        };
    }
};

const handleGetMaterials = async () => {
    try {
        const materials = await db.Material.findAll();
        if (materials) {
            return {
                code: ResponseCode.SUCCESS,
                message: "get materials successfully",
                result: materials,
            };
        }
        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "get materials failure",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: error.message || error,
        };
    }
};

const handleCountProducts = async () => {
    try {
        const countByCategory = await db.CategoryProductCountView.findAll();

        if (countByCategory) {
            return {
                code: ResponseCode.SUCCESS,
                message: "get products count by category successfully",
                result: countByCategory,
            };
        }
        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "get products count by category failure",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: error.message || error,
        };
    }
};

const handleGetProducts = async (encodedSlugs, page) => {
    try {
        const currentPage = page && !_.isNaN(page) ? page : 1;
        const decodedSlugs = decodeURIComponent(encodedSlugs);

        if (!_.isEmpty(decodedSlugs)) {
            const slugs = decodedSlugs.split(",");

            const categories = await db.Category.findAll({
                where: {
                    slug: slugs,
                },
            });

            const { count, rows } = await db.Product.findAndCountAll({
                where: {
                    category: categories.map((item) => item.name),
                },
                attributes: {
                    exclude: ["description", "color"],
                },
                order: [["id", "DESC"]],
                limit: 12,
                offset: (currentPage - 1) * 12,
            });

            if (rows) {
                return {
                    code: ResponseCode.SUCCESS,
                    message: "get products successfully",
                    page: currentPage,
                    total_pages: Math.ceil(count / 12),
                    total_results: count,
                    result: rows,
                };
            }
        }

        const { count, rows } = await db.Product.findAndCountAll({
            attributes: {
                exclude: ["description", "color"],
            },
            order: [["id", "DESC"]],
            limit: 12,
            offset: (currentPage - 1) * 12,
        });

        if (rows) {
            return {
                code: ResponseCode.SUCCESS,
                message: "get products successfully",
                page: currentPage,
                total_pages: Math.ceil(count / 12),
                total_results: count,
                result: rows,
            };
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "get products failure",
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: error.message || error,
        };
    }
};

const handleGetProductById = async (product_id) => {
    try {
        const product = await db.Product.findOne({
            attributes: {
                exclude: ["image_url"],
            },
            where: {
                id: product_id,
            },
        });
        if (product) {
            const images = await db.Image.findAll({
                where: {
                    target_id: product_id,
                    target_type: "product",
                },
            });

            return {
                code: ResponseCode.SUCCESS,
                message: "get product successfully",
                result: { ...product, images },
            };
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "get products failure",
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: error.message || error,
        };
    }
};

const handleCreateProduct = async (product) => {
    try {
        const productToInsert = {
            ...product,
            sold: 0,
        };

        const createdProduct = await db.Product.create(productToInsert);
        // if success store uploaded images to database
        if (createdProduct) {
            const imagesToInsert = product.images.map((image) => ({
                target_id: createdProduct.id,
                target_type: "product",
                public_id: image.public_id,
                secure_url: image.secure_url,
                thumbnail_url: image.thumbnail_url,
            }));
            await db.Image.bulkCreate(imagesToInsert);

            return {
                code: ResponseCode.SUCCESS,
                message: "Create product successfully.",
            };
        }
        // if not rollback uploaded images in cloud
        await imageService.handleRemoveImagesFromCloud(product.images);

        return {
            code: ResponseCode.SUCCESS,
            message: "Create product successfully.",
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: error.message || error,
        };
    }
};

const handleUpdateProduct = async (product) => {
    const t = await sequelize.transaction();
    try {
        const existed = await db.Product.findOne({
            where: { id: product.id },
        });

        if (!existed) {
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Invalid product.",
            };
        }

        const lastVersionImages = await db.Image.findAll({
            where: {
                target_id: product.id,
                target_type: "product",
            },
        });

        const removedImages = getDifference(product.images, lastVersionImages);
        const uploadedImages = getDifference(lastVersionImages, product.images);

        await Promise.all([
            removedImages.length > 0 &&
                db.Image.destroy({
                    where: {
                        id: removedImages.map((image) => image.id),
                        target_id: product.id,
                        target_type: "product",
                    },
                    transaction: t,
                }),

            uploadedImages.length > 0 &&
                db.Image.bulkCreate(
                    uploadedImages.map((image) => ({
                        target_id: product.id,
                        target_type: "product",
                        public_id: image.public_id,
                        secure_url: image.secure_url,
                        thumbnail_url: image.thumbnail_url,
                    })),
                    { transaction: t },
                ),

            !_.isEqual(product, existed) &&
                db.Product.update(
                    {
                        ...product,
                    },
                    {
                        where: {
                            id: product.id,
                        },
                        transaction: t,
                    },
                ),
        ]);

        await t.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Update product successfully.",
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

const handleDeleteProduct = async (product) => {
    const t = await sequelize.transaction();
    try {
        const existed = await db.Product.findOne({
            where: {
                id: product.id,
                name: product.name,
                price: product.price,
            },
        });

        if (!existed) {
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Invalid product.",
            };
        }

        const images = await db.Image.findAll({
            where: {
                target_id: product.id,
                target_type: "product",
            },
        });

        await Promise.all([
            db.Product.destroy({
                where: { id: product.id },
                transaction: t,
            }),
            db.Image.destroy({
                where: {
                    target_id: product.id,
                    target_type: "product",
                },
                transaction: t,
            }),
        ]);

        await t.commit();

        await imageService.handleRemoveImagesFromCloud(images);

        return {
            code: ResponseCode.SUCCESS,
            message: "Delete product successfully.",
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

/** SUPPORT METHODS */

const getDifference = (originArray, newArray) => {
    const difference = [];

    for (const element of newArray) {
        if (!originArray.includes(element)) {
            difference.push(element);
        }
    }

    return difference;
};

module.exports = {
    handleGetCategories,
    handleGetMaterials,
    handleCountProducts,
    handleGetProducts,
    handleGetProductById,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
};