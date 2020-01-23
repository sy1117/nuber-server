
import app from './app';
import { createConnection } from 'typeorm'
import connectionOptions from './ormConfig'
import { Options } from 'graphql-yoga';
import dotenv from 'dotenv';

dotenv.config();

const PORT : number | string = process.env.PORT || 4000;
const PLAYGROUND : string = "/playground";
const GRAPHQL_ENDPOINT : string = "/graphql";

const appOptions : Options = {
    port : PORT,
    playground: PLAYGROUND,
    endpoint : GRAPHQL_ENDPOINT,
}

const handleAppStart = ():void=>{
    console.log(`Listening on port ${PORT}.`)
}

createConnection(connectionOptions).then(()=>{
    app.start(appOptions, handleAppStart);
})
