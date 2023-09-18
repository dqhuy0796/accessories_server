import productService from "../services/productService.js";
import imageService from "../services/imageService.js";
import { ResponseCode } from "../constant";
import _ from "lodash";

const getCategories = async (req, res) => {
    const data = await productService.handleGetCategories();
    return res.status(200).json(data);
};
const getMaterials = async (req, res) => {
    const data = await productService.handleGetMaterials();
    return res.status(200).json(data);
};

const countProducts = async (req, res) => {
    const data = await productService.handleCountProducts();
    return res.status(200).json(data);
};
// PRODUCT

const getProduct = async (req, res) => {
    const { product_id, categories, page } = req.query;

    if (product_id) {
        const data = await productService.handleGetProductById(product_id);
        return res.status(200).json(data);
    }
    const data = await productService.handleGetProducts(categories, page);
    return res.status(200).json(data);
};

const createProduct = async (req, res) => {
    const { name, slug, price, brand, category, material, color, quantity, feature_image_url, description, images } =
        req.body;

    if (
        name &&
        slug &&
        price &&
        brand &&
        category &&
        material &&
        color &&
        quantity &&
        feature_image_url &&
        description &&
        images
    ) {
        const data = await productService.handleCreateProduct({
            name,
            slug,
            price,
            brand,
            category,
            material,
            color,
            quantity,
            feature_image_url,
            description,
            images,
        });
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

const updateProduct = async (req, res) => {
    const {
        id,
        name,
        slug,
        price,
        brand,
        category,
        material,
        color,
        quantity,
        description,
        feature_image_url,
        images,
    } = req.body;

    if (
        id &&
        name &&
        slug &&
        price &&
        brand &&
        category &&
        material &&
        color &&
        quantity &&
        feature_image_url &&
        description &&
        images
    ) {
        const data = await productService.handleUpdateProduct({
            id,
            name,
            slug,
            price,
            brand,
            category,
            material,
            color,
            quantity,
            feature_image_url,
            description,
            images,
        });
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

const deleteProduct = async (req, res) => {
    const { id, name, price } = req.body;

    if (id && name && price) {
        const data = await productService.handleDeleteProduct({
            id,
            name,
            price,
        });
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

const rollbackImages = async (req, res) => {
    const { images } = req.body;

    if (images && !_.isEmpty(images)) {
        const result = await imageService.handleRemoveImagesFromCloud(images);
        if (result) {
            return res.status(200).json({
                code: ResponseCode.SUCCESS,
                message: "Delete images successfully.",
            });
        }

        return res.status(200).json({
            code: ResponseCode.DATABASE_ERROR,
            message: "Delete images failure.",
        });
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

export default {
    getCategories,
    getMaterials,
    countProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    rollbackImages,
};
