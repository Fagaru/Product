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
const downloadFiles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileUrl = 'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_bdpm.txt';
    const destinationFilePath = '../data_gouv/file_txt';
    const directoryPath = '../data_gouv/file_txt/'; // Replace this with the path to your desired directory
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
            console.log(fileName);
            const filePath = path_1.default.join(directoryPath, fileName);
            fs_1.default.writeFile(filePath, fileContent, (err) => {
                if (err) {
                    console.error('Error creating the file:', err);
                }
                else {
                    console.log('File created successfully!');
                }
            });
            downloadFile(fileUrl, filePath);
            console.log('File downloaded successfully.');
        });
        res.json({
            status: "success",
            data: {},
            message: 'File downloaded successfully.',
        });
    }
    catch (error) {
        console.error('Error downloading file:', error);
        next(error);
    }
});
exports.downloadFiles = downloadFiles;
// Import data from file.txt
const dataFilePath = '../data_gouv/file_txt/CIS_CIP_bdpm.txt'; // Adjust the path to your data file
const importData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    db_1.default.once('open', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Connected to MongoDB');
        try {
            const data = yield fs_1.default.promises.readFile(dataFilePath, 'utf8');
            const lines = data.trim().split('\n');
            for (const line of lines) {
                const [codeCIS, codeCIP7, presentationLabel, administrativeStatusOfPresentation, marketingStatus, marketingDeclarationDate, codeCIP13, approvalForCommunities, reimbursementRate, priceInEuros, indicGivingEntitlementToRefund] = line.split('\t');
                const cis_cip_bdpm = new CIS_CIP_bdpm_model_1.default({ codeCIS, codeCIP7, presentationLabel, administrativeStatusOfPresentation, marketingStatus, marketingDeclarationDate, codeCIP13, approvalForCommunities, reimbursementRate, priceInEuros, indicGivingEntitlementToRefund });
                yield cis_cip_bdpm.save();
                console.log(`Inserted: ${codeCIS}, ${marketingDeclarationDate}`);
            }
            console.log('Data insertion complete');
            res.json({
                status: "success",
                data: {},
                message: 'File downloaded successfully.',
            });
        }
        catch (error) {
            console.error('Error:', error);
            next(error);
        }
        finally {
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
