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
exports.importData = exports.downloadFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("../database/db"));
const CIS_CIP_bdpm_model_1 = __importDefault(require("../models/CIS_CIP_bdpm.model"));
const logger_1 = require("../logging/logger");
const downloadFiles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileUrl = 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_bdpm.txt';
    const destinationFilePath = '../data_gouv/file_txt';
    const directoryPath = 'data_gouv/files/'; // Replace this with the path to your desired directory
    // const fileName = 'CIS_bdpm.txt';
    const fileContent = '';
    const myDictionary = {
        key1: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_bdpm.txt',
        key2: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CIP_bdpm.txt',
        key3: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_COMPO_bdpm.txt',
        key4: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_HAS_SMR_bdpm.txt',
        key5: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_HAS_ASMR_bdpm.txt',
        key6: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=HAS_LiensPageCT_bdpm.txt',
        key7: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_GENER_bdpm.txt',
        key8: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CPD_bdpm.txt',
        key9: 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_InfoImportantes.txt'
    };
    // Create the directory if it doesn't exist
    if (!fs_1.default.existsSync(directoryPath)) {
        fs_1.default.mkdirSync(directoryPath, { recursive: true });
    }
    try {
        Object.values(myDictionary).forEach((value) => {
            console.log(value);
            let match = value.split('=');
            const fileName = match[1];
            const filePath = path_1.default.join(directoryPath, fileName);
            fs_1.default.writeFile(filePath, fileContent, (err) => {
                if (err) {
                    logger_1.logger.error('Error creating the file:', err);
                }
                else {
                    //logger.info('File created successfully!');
                }
            });
            downloadFile(fileUrl, filePath);
        });
        res.json({
            status: "success",
            data: {},
            message: 'File downloaded successfully.',
        });
        logger_1.logger.info('File downloaded successfully.');
    }
    catch (error) {
        logger_1.logger.error('Error downloading file:', error);
        next(error);
    }
});
exports.downloadFiles = downloadFiles;
// Import data from file.txt
const dataFilePath = '../data_gouv/file_txt/CIS_CIP_bdpm.txt'; // Adjust the path to your data file
const importData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    db_1.default.once('open', () => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.logger.info('Connected to MongoDB to import data from the web');
        try {
            const data = yield fs_1.default.promises.readFile(dataFilePath, 'utf8');
            const lines = data.trim().split('\n');
            for (const line of lines) {
                const [codeCIS, codeCIP7, presentationLabel, administrativeStatusOfPresentation, marketingStatus, marketingDeclarationDate, codeCIP13, approvalForCommunities, reimbursementRate, priceInEuros, indicGivingEntitlementToRefund] = line.split('\t');
                const cis_cip_bdpm = new CIS_CIP_bdpm_model_1.default({ codeCIS, codeCIP7, presentationLabel, administrativeStatusOfPresentation, marketingStatus, marketingDeclarationDate, codeCIP13, approvalForCommunities, reimbursementRate, priceInEuros, indicGivingEntitlementToRefund });
                yield cis_cip_bdpm.save();
                console.log(`Inserted: ${codeCIS}, ${marketingDeclarationDate}`);
            }
            res.json({
                status: "success",
                data: {},
                message: 'Files downloaded successfully.',
            });
            logger_1.logger.info('Data insertion complete');
        }
        catch (error) {
            logger_1.logger.error('Error:', error);
            next(error);
        }
        finally {
            logger_1.logger.warn("Connection to database closed");
            db_1.default.close();
        }
    }));
});
exports.importData = importData;
const downloadFile = (url, destinationPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)({
            url,
            method: 'GET',
            responseType: 'stream',
        });
        const writer = fs_1.default.createWriteStream(destinationPath);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    }
    catch (error) {
        throw new Error('Error downloading the file: ' + error);
    }
});
