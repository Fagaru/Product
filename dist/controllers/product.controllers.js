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
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new product_model_1.default(req.body);
        console.log(req.body);
        console.log("Product");
        console.log(newProduct);
        const savedOrder = yield newProduct.save();
        res.json({
            status: "success",
            data: Object.assign({}, newProduct),
            message: 'Product created Succesfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const createMerchant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new product_model_1.default(req.body);
        console.log(req.body);
        console.log("Product");
        console.log(newProduct);
        if (req.body.typeProduct == "parapharmacy") {
            const savedOrder = yield newProduct.save();
            res.json({
                status: "success",
                data: Object.assign({}, newProduct),
                message: 'Product created Succesfully',
            });
        }
        else {
            res.json({
                status: "failed",
                data: {},
                message: 'You are not authorized to perform this action',
            });
        }
    }
    catch (error) {
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
    }
    catch (error) {
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
            message: 'Product found Succesfully',
        });
    }
    catch (error) {
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
        const product = yield product_model_1.default.updateOne(filter, Object.assign(Object.assign({}, req.body), { _id: req.params.id, updateAt: Date.now() }));
        res.json({
            status: "success",
            data: Object.assign({}, product),
            message: 'Product updated Succesfully',
        });
    }
    catch (error) {
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
    }
    catch (error) {
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
        }
        else {
            res.json({
                status: "failed",
                data: Object.assign({}, deletedProduct),
                message: 'You are not authorized to perform this action',
            });
        }
    }
    catch (error) {
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
        }
        else {
            res.json({
                status: "success",
                data: Object.assign({}, deletedProduct),
                message: 'Please request deletion before taking this action.',
            });
        }
    }
    catch (error) {
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
    }
    catch (error) {
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
