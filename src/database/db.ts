import mongoose from "mongoose";
import config from '../config';

//const uri = "mongodb+srv://abdou:UeawXp23HKfOfZsp@cluster0.yy249vl.mongodb.net/"
const uri = config.uri || "mongodb+srv://abdou:UeawXp23HKfOfZsp@cluster0.yy249vl.mongodb.net/";
mongoose.connect(uri,
    { 
    // dbName: 'CESIEATS'
    dbName: config.dbName
    })
  .then(() => console.log('Connexion à MongoDB  Product réussie !'))
  .catch(() => console.log('Connexion à MongoDB Product échouée !'));

export default mongoose.connection;