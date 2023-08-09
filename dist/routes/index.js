"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_routes_1 = __importDefault(require("./api/product.routes"));
const file_routes_1 = __importDefault(require("./api/file.routes"));
const routes = (0, express_1.Router)();
routes.use('/products', product_routes_1.default);
routes.use('/files', file_routes_1.default);
exports.default = routes;
