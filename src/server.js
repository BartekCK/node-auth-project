import express from "express";
import logger from 'morgan';
import {userRoute} from "./routes/users";

const server = express();

server.use(express.json());
server.use(logger('dev'));
//Routes

server.use('/users',  userRoute);

//Start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server start listening at ${port}`);
})
