"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneSudo = exports.deleteOne = exports.deleteAsk = exports.all = exports.updateOne = exports.getTypeProduct = exports.findOne = exports.createMerchant = exports.create = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const logger_1 = require("../logging/logger");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { id: req.body.id };
        const product = yield product_model_1.default.findOne(filter).select("name").lean();
        if (product) {
            res.json({
                status: "success",
                data: Object.assign({}, product),
                message: 'Product already exist',
            });
            logger_1.logger.info("Created failed, Product already exist");
        }
        else {
            const newProduct = new product_model_1.default(req.body);
            const savedOrder = yield newProduct.save();
            res.json({
                status: "success",
                data: Object.assign({}, newProduct),
                message: 'Product created Succesfully',
            });
            logger_1.logger.info("New product created", newProduct.id);
        }
    }
    catch (error) {
        logger_1.logger.error("Erreur ", error);
        next(error);
    }
});
exports.create = create;
const createMerchant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { id: req.body.id };
        const product = yield product_model_1.default.findOne(filter).select("name").lean();
        if (product) {
            res.json({
                status: "success",
                data: Object.assign({}, product),
                message: 'Product already exist',
            });
            logger_1.logger.info("Created failed, Product already exist");
        }
        else {
            const newProduct = new product_model_1.default(req.body);
            if (req.body.typeProduct == "parapharmacy") {
                const savedOrder = yield newProduct.save();
                res.json({
                    status: "success",
                    data: Object.assign({}, newProduct),
                    message: 'Product created Succesfully',
                });
                logger_1.logger.info("New product created", newProduct.id);
            }
            else {
                res.json({
                    status: "failed",
                    data: {},
                    message: 'You are not authorized to perform this action',
                });
                logger_1.logger.warn("Action not authorized for this user");
            }
        }
    }
    catch (error) {
        logger_1.logger.error("Erreur ", error);
        next(error);
    }
});
exports.createMerchant = createMerchant;
const findOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { _id: req.params.id };
        const product = yield product_model_1.default.findOne(filter);
        res.json({
            status: "success",
            data: Object.assign({}, product),
            message: 'Product found Succesfully',
        });
        logger_1.logger.info("Product found Succesfully");
    }
    catch (error) {
        logger_1.logger.error("Erreur ", error);
        next(error);
    }
});
exports.findOne = findOne;
const getTypeProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { typeProduct: req.params.typeProduct };
        const product = yield product_model_1.default.find(filter);
        res.json({
            status: "success",
            data: Object.assign({}, product),
            message: 'Products found Succesfully',
        });
        logger_1.logger.info("Products found Succesfully");
    }
    catch (error) {
        logger_1.logger.error("Erreur ", error);
        next(error);
    }
});
exports.getTypeProduct = getTypeProduct;
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { _id: req.params.id };
        // const update = {updateAt: Date.now()}
        // const order = await Product.findOneAndUpdate(filter, req.body);
        // const orderU = await Product.findOneAndUpdate(filter, update);
        if (req.body.typeProduct == "parapharmacy") {
            const product = yield product_model_1.default.updateOne(filter, Object.assign(Object.assign({}, req.body), { _id: req.params.id, updateAt: Date.now() }));
            res.json({
                status: "success",
                data: Object.assign({}, product),
                message: 'Product updated Succesfully',
            });
            logger_1.logger.info("Product updated Succesfully");
        }
        else {
            res.json({
                status: "failed",
                data: {},
                message: 'You are not authorized to perform this action',
            });
            logger_1.logger.warn("Action not authorized for this user");
        }
    }
    catch (error) {
        logger_1.logger.error("Erreur ", error);
        next(error);
    }
});
exports.updateOne = updateOne;
const all = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield product_model_1.default.find();
        res.json({
            status: "success",
            data: Object.assign({}, allProducts),
            message: 'Products found Succesfully',
        });
        logger_1.logger.info("Products found Succesfully");
    }
    catch (error) {
        logger_1.logger.error("Erreur ", error);
        next(error);
    }
});
exports.all = all;
const deleteAsk = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { _id: req.params.id };
        const deletedProduct = yield product_model_1.default.findOne(filter);
        if ((deletedProduct === null || deletedProduct === void 0 ? void 0 : deletedProduct.typeProduct) == "parapharmacy") {
            const product = yield product_model_1.default.updateOne(filter, { deleted: true, updateAt: Date.now() });
            res.json({
                status: "success",
                data: Object.assign({}, product),
                message: 'Your request will be taken into account',
            });
            logger_1.logger.info("Ask to delete product ", req.params.id);
        }
        else {
            res.json({
                status: "failed",
                data: Object.assign({}, deletedProduct),
                message: 'You are not authorized to perform this action',
            });
            logger_1.logger.warn("Action not authorized for this user");
        }
    }
    catch (error) {
        logger_1.logger.error("Erreur ", error);
        next(error);
    }
});
exports.deleteAsk = deleteAsk;
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { _id: req.params.id };
        const deletedProduct = yield product_model_1.default.findOne(filter);
        if ((deletedProduct === null || deletedProduct === void 0 ? void 0 : deletedProduct.deleted) == true) {
            const deleteProduct = yield product_model_1.default.deleteOne(filter);
            res.json({
                status: "success",
                data: Object.assign({}, deleteProduct),
                message: 'Product deleted Succesfully, you can no longer retrieve this data',
            });
            logger_1.logger.info("Product deleted succesfully");
        }
        else {
            res.json({
                status: "success",
                data: Object.assign({}, deletedProduct),
                message: 'Please request deletion before taking this action.',
            });
            logger_1.logger.warn("Action not authorized for this user, user tries to delete a product before applying");
        }
    }
    catch (error) {
        logger_1.logger.error("Erreur ", error);
        next(error);
    }
});
exports.deleteOne = deleteOne;
const deleteOneSudo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { _id: req.params.id };
        const deleteProduct = yield product_model_1.default.deleteOne(filter);
        res.json({
            status: "success",
            data: Object.assign({}, deleteProduct),
            message: 'Product deleted Succesfully with sudo command, you can no longer retrieve this data',
        });
        logger_1.logger.warn("Product deleted succesfully by using sudoDelete");
    }
    catch (error) {
        logger_1.logger.error("Erreur ", error);
        next(error);
    }
});
exports.deleteOneSudo = deleteOneSudo;
// export const historyUser = async (req: Request, res: Response, next: NextFunction) =>{
//     try{
//         const filter = {user: req.params.user};
//         const product = await Product.find(filter);
//         res.json({
//             status: "success",
//             data: { ...product },
//             message: 'history products found Succesfully',
//         });
//     } catch(error) {
//         next(error);
//     }   
// };
