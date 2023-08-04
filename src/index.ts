import express, { Application, Request, Response} from 'express';

const PORT = 3001;

// create instance server
const app: Application = express();
// Gestion des variables d'environnement
//const dotenv = require('dotenv')
// middleware to parse incomming requests
app.use(express.json());

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