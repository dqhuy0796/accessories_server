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
            message: "Error occurs, check again!",
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
            message: "Error occurs, check again!",
        };
    }
};

const handleCountProducts = async () => {
    try {
        const [count_by_category, count_by_material, count_by_color] = await Promise.all([
            db.CountProductByCategoryView.findAll(),
            db.CountProductByMaterialView.findAll(),
            db.CountProductByColorView.findAll(),
        ]);

        return {
            code: ResponseCode.SUCCESS,
            message: "get products count by category successfully",
            result: [
                {
                    count_by: "category",
                    data: count_by_category ?? [],
                },
                {
                    count_by: "material",
                    data: count_by_material ?? [],
                },
                {
                    count_by: "color",
                    data: count_by_color ?? [],
                },
            ],
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleGetProducts = async (encodedSlugs, page) => {
    try {
        const currentPage = page && !_.isNaN(page) ? page : 1;
        const decodedSlugs = decodeURIComponent(encodedSlugs);

        if (decodedSlugs === "all") {
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
                    message: "Get products successfully.",
                    page: currentPage,
                    total_pages: Math.ceil(count / 12),
                    total_results: count,
                    result: rows,
                };
            }
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "No product match, check again.",
            };
        }

        if (!_.isEmpty(decodedSlugs) && decodedSlugs !== "all") {
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
                    message: "Get products successfully",
                    page: currentPage,
                    total_pages: Math.ceil(count / 12),
                    total_results: count,
                    result: rows,
                };
            }
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "No product match, check again.",
            };
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "Get products failure.",
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleGetProductBy = async (slug) => {
    try {
        const product = await db.Product.findOne({
            attributes: {
                exclude: ["image_url"],
            },
            where: {
                slug,
            },
        });
        if (product) {
            const images = await db.Image.findAll({
                where: {
                    target_id: product.id,
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
            message: "get product failure",
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
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
            message: "Error occurs, check again!",
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
            message: "Error occurs, check again!",
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
            message: "Error occurs, check again!",
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
    handleGetProductBy,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
};
