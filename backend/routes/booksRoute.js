import express from 'express';
import { Book } from '../models/bookModel.js'

const router=express.Router();

//route for saving a new book
router.post('/',async(request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            response.status(400).send({message:'send all required fields'});
        }
        const newBook={
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        };

        const book= await Book.create(newBook);
        return response.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})


//route to get all book
router.get('/',async(request,response)=>{
    try{
        const books=await Book.find({});//passing empty json {} to get all details of book
        return response.status(200).json({
        count:books.length,
        data:books,
        });
    }
    catch(error)
    {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

//route to get book by id
router.get('/:id',async(request,response)=>{
    try{
        const { id }=request.params;

        const books=await Book.findById(id);//passing empty json {} to get all details of book
        return response.status(200).json(books);
    }
    catch(error)
    {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

//route to update a existing book
router.put('/:id',async(request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            response.status(400).send({message:'send all required fields'});
        }
        const {id}=request.params;
        const result=await Book.findByIdAndUpdate(id,request.body);
        if(!result)
        {
            return response.status(404).send({message:'Book not found!'});
        }
        return response.status(200).send({message:'Book Updated sucessfully!'});
    }
    catch(error)
    {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//route to deleting a book
router.delete('/:id',async (request,response)=>{
    try{
        const {id}=request.params;
        const result=await Book.findByIdAndDelete(id);
        if(!result)
        {
            return response.status(404).send({message:'Book not found!'});
        }
        return response.status(200).send({message:'Book Deleted sucessfully!'});
    }
    catch(error)
    {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

export default router;