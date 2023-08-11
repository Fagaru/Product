import dotenv from 'dotenv'

dotenv.config();

//console.log(process.env);
const { PORT } = process.env;

const {
    NODE_ENV,
    CREATOR,
    uri,
    dbName,
    BCRIPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_SECRET,
} = process.env;

export default {
    port: PORT,
    creator: CREATOR,
    dbName: dbName,
    uri: uri,
    pepper: BCRIPT_PASSWORD,
    salt: SALT_ROUNDS,
    tokenSecret: TOKEN_SECRET,
};