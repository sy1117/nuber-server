import { ConnectionOptions } from 'typeorm';    

const defaultConnectionOptions : ConnectionOptions = {
    type : "postgres",
    database : "soyoung",
    synchronize : true,
    logging : true,
    entities : [
        "entities/**/*.*"
    ],
    host : process.env.DB_ENDPOINT,
    port : 5432, // postgres default port number
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
}

export default defaultConnectionOptions;