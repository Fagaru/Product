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
const db_1 = __importDefault(require("../database/db"));
const CIS_CIP_bdpm_model_1 = __importDefault(require("../models/CIS_CIP_bdpm.model"));
const fs_1 = __importDefault(require("fs"));
describe('GET /', () => {
    it('should return a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const dataFilePath = '../data_gouv/file_txt/CIS_CIP_bdpm.txt'; // Adjust the path to your data file
        db_1.default.once('open', () => __awaiter(void 0, void 0, void 0, function* () {
            console.log('Connected to MongoDB');
            try {
                const data = yield fs_1.default.promises.readFile(dataFilePath, 'utf8');
                const lines = data.trim().split('\n');
                for (const line of lines) {
                    const [codeCIS, codeCIP7, presentationLabel, administrativeStatusOfPresentation, marketingStatus, marketingDeclarationDate, codeCIP13, approvalForCommunities, reimbursementRate, priceInEuros, indicGivingEntitlementToRefund] = line.replace(/,[^\\t]*\\t/g, '\t').split('\t');
                    const cis_cip_bdpm = new CIS_CIP_bdpm_model_1.default({ codeCIS, codeCIP7, presentationLabel, administrativeStatusOfPresentation, marketingStatus, marketingDeclarationDate, codeCIP13, approvalForCommunities, reimbursementRate, priceInEuros, indicGivingEntitlementToRefund });
                    yield cis_cip_bdpm.save();
                    console.log(`Inserted: ${codeCIS}, ${marketingDeclarationDate}`);
                }
                console.log('Data insertion complete');
            }
            catch (error) {
                console.error('Error:', error);
            }
            finally {
                db_1.default.close();
            }
        }));
    }));
});
