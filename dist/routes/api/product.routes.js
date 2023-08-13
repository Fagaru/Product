"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers = __importStar(require("../../controllers/product.controllers"));
const routes = (0, express_1.Router)();
// api/roles
routes.route('/all').get(controllers.all);
routes.route('/sudoCreateProduct').post(controllers.create);
routes.route('/createProduct').post(controllers.createMerchant);
routes.route('/getById/:id').get(controllers.getById);
routes.route('/getByTypeProduct/:typeProduct').get(controllers.getByTypeProduct);
routes.route('/updateOne/:id').patch(controllers.updateOne);
routes.route('/deleteAsk/:id').patch(controllers.deleteAsk);
routes.route('/deleteOne/:id').patch(controllers.deleteOne);
routes.route('/sudoDeleteOne/:id').patch(controllers.deleteOneSudo);
exports.default = routes;
