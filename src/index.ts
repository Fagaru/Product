import express, { Application, Request, Response} from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from 'body-parser'
import routes from './routes';
import db from './database/db_test';
import config from './config';
import {logger} from './logging/logger'
const PORT = config.port || 3001;


db.on('connected', function() {
       logger.info("database is ready now with db");
   });
db.on('disconnected', function() {
   logger.error("database is disconnected with db");
   });

// create instance server
const app: Application = express();


app.use(express.json());

// Autoriser l'acces depuis react
app.use(cors());

// parse application/json
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) =>{
   //throw new Error('Error exist');
   res.json({
       message: 'Hello world from get!',
   });
});

// request post
app.post('/', (req: Request, res: Response) =>{
   //throw new Error('Error exist');
   console.log(req.body);
   res.json({
       message: 'Hello world from  post!',
       data: req.body,
   });
});

// api CESIEATS User et Role
app.use('/api', routes);

app.use((req: Request, res: Response) => {
   res.status(404).json({
       message: 'Vérifier votre url',
   });
});

// start express server
app.listen(PORT, () => {
   logger.info(`Server is running at port:${PORT}`);
});  

export default app;
