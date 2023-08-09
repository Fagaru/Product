"use strict";
// __tests__/index.test.ts or tests/index.test.ts
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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index")); // Make sure the path is correct
describe('GET /', () => {
    it('should return a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/products/all');
        expect(response.status).toBe(200);
    }));
    it('should return a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const requestBody = {
            "id": 3,
            "name": "third product",
            "price": "14",
            "description": "respecter la posologie",
            "category": "head",
            "typeProduct": "parapharmacy",
            "image": "..."
        };
        const response = yield (0, supertest_1.default)(index_1.default).post('/api/products/sudoCreateProduct').send(requestBody);
        expect(response.status).toBe(200);
    }));
    it('should return a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const requestBody = {
            "id": 3,
            "name": "third product",
            "price": "14",
            "description": "respecter la posologie",
            "category": "head",
            "typeProduct": "parapharmacy",
            "image": "..."
        };
        const response = yield (0, supertest_1.default)(index_1.default).post('/api/products/createProduct').send(requestBody);
        expect(response.status).toBe(200);
    }));
    it('should return a 200 status code for download files', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/files/downloadFiles');
        expect(response.status).toBe(200);
    }));
    it('should return a JSON response', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/products/all');
        expect(response.type).toEqual('application/json');
    }));
});
