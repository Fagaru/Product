import dotenv from 'dotenv'

dotenv.config();

//console.log(process.env);
const { PORT } = process.env;

const {
    NODE_ENV,
    CREATOR,
    DB_URI,
    DB_NAME,
    BCRIPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_SECRET,
} = process.env;

export default {
    port: PORT,
    creator: CREATOR,
    db_name: DB_NAME,
    db_uri: DB_URI,
    pepper: BCRIPT_PASSWORD,
    salt: SALT_ROUNDS,
    tokenSecret: TOKEN_SECRET,
};