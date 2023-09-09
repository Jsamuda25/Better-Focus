import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import User from '../models/User.js';

const Schema = mongoose.Schema;
let db = mongoose.connection;

let router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.get('/:username', express.json(), getTodos);
router.post('/add/', express.json(), addTodo);
router.delete('/delete/:username/:id', express.json(), deleteTodo);
router.put('/update', express.json(), updateTodo);

async function getTodos (req, res) {
    const username = req.params.username;

    try{
        const user = await User.findOne({username});

        if(user){
            const todos = user.todo;
            res.status(200).json({todos});
        }
        else{
            res.status(400).json({message:'User does not exist'});
        }
    }
    catch(err){
        res.status(400).json({Error:"Error getting todos"});
    }
}

async function addTodo (req, res) {
    const username = req.body.username;
    const newTodoItem = req.body.todoItem;

    try{
        const user = await User.findOne({username});

        if(user){
            const todos = await User.updateOne({username: username}, {$push: {todo: newTodoItem}});
            res.status(200).json({message:'Todo added'});
        }
        else{
            res.status(400).json({message:'User does not exist'});
        }
    }
    catch(err){
        res.status(400).json({Error:"Error adding todo"});
    }


}

async function deleteTodo (req, res) {
    const username = req.params.username;
    const id = req.params.id;
    console.log(username, id);

    try{
        let user = await User.findOne({username});	

        if(user){
            user.todo = user.todo.filter((todo) => todo.id != id);
            await user.save();
            res.status(200).json({message:'Todo Item deleted'});
        }
        else{
            res.status(400).json({message:'User does not exist'});
        }
    }
    catch(err){
        res.status(400).json({Error:"Error deleting todo"});
    }
}

async function updateTodo (req, res) {
    let username = req.body.username;
    let id = req.body.todoId;
    let completed = req.body.completed;

    try{
        let user = await User.findOne({username:username});     
        user.todo.forEach((item) => {
            if(item.id == id){
                item.completed = completed;
            }
        });
        let updateUser =  await User.updateOne({username:username}, {todo: user.todo})
        res.status(200).json({message:'Todo Item updated'});
    }
    catch(err){
        res.status(400).json({Error:"Error updating todo"});
    }

}


export default router;