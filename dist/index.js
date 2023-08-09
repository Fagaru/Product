"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./database/db"));
const PORT = 3001;
// const uri = "mongodb+srv://abdou:UeawXp23HKfOfZsp@cluster0.yy249vl.mongodb.net/"
// const uri = "mongodb+srv://root:root@cluster0.ssyvssc.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(uri,
//     { 
//     dbName: 'CESIEATS'
//     })
//   .then(() => console.log('Connexion à MongoDB  Product réussie !'))
//   .catch(() => console.log('Connexion à MongoDB Product échouée !'));
//   mongoose.connection.on('connected', function() {
//     console.log("database is ready now");
//   });
//   mongoose.connection.on('disconnected', function() {
//   console.log("database is disconnected");
//   });
db_1.default.on('connected', function () {
    console.log("database is ready now with db");
});
db_1.default.on('disconnected', function () {
    console.log("database is disconnected with db");
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
    console.log(`Server is running at port:${PORT}`);
});
exports.default = app;
