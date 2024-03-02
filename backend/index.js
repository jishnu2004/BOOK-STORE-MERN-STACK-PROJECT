import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app=express();

app.use(express.json());

//middle ware for handling cors
//method 1:
app.use(cors());

//method:2 using custom origins
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// );


app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome  to mern')
});

//using express to get all routes
app.use('/books',booksRoute);


mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT ,()=>{
        console.log(`App is listening : ${PORT}`);
    })
})
.catch(()=>{
    console.log(error);
})