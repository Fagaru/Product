import express, { Application, Request, Response} from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from 'body-parser'
import routes from './routes';
import db from './database/db';

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

db.on('connected', function() {
       console.log("database is ready now with db");
   });
db.on('disconnected', function() {
   console.log("database is disconnected with db");
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
   console.log(`Server is running at port:${PORT}`);
});  

export default app;
