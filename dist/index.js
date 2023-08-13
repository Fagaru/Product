"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const db_test_1 = __importDefault(require("./database/db_test"));
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./logging/logger");
const PORT = config_1.default.port || 3001;
db_test_1.default.on('connected', function () {
    logger_1.logger.info("database is ready now with db");
});
db_test_1.default.on('disconnected', function () {
    logger_1.logger.error("database is disconnected with db");
});
// create instance server
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Autoriser l'acces depuis react
app.use((0, cors_1.default)());
// parse application/json
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    //throw new Error('Error exist');
    res.json({
        message: 'Hello world from get!',
    });
});
// request post
app.post('/', (req, res) => {
    //throw new Error('Error exist');
    console.log(req.body);
    res.json({
        message: 'Hello world from  post!',
        data: req.body,
    });
});
// api CESIEATS User et Role
app.use('/api', routes_1.default);
app.use((req, res) => {
    res.status(404).json({
        message: 'Vérifier votre url',
    });
});
// start express server
app.listen(PORT, () => {
    logger_1.logger.info(`Server is running at port:${PORT}`);
});
exports.default = app;
