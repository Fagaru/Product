"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
//const uri = "mongodb+srv://abdou:UeawXp23HKfOfZsp@cluster0.yy249vl.mongodb.net/"
const uri = config_1.default.uri || "mongodb+srv://abdou:UeawXp23HKfOfZsp@cluster0.yy249vl.mongodb.net/";
mongoose_1.default.connect(uri, {
    // dbName: 'CESIEATS'
    dbName: config_1.default.dbName
})
    .then(() => console.log('Connexion à MongoDB  Product réussie !'))
    .catch(() => console.log('Connexion à MongoDB Product échouée !'));
exports.default = mongoose_1.default.connection;
