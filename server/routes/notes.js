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

router.post('/add', express.json(), addNote);
router.get('/:username', express.json(), getNotes);
router.delete('/delete', express.json(), deleteNote);


async function addNote (req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const category = req.body.category;
    const username = req.body.username;
    const id = req.body.id;
    console.log(title, content, category, username)

    const newNote = {title: title, content: content, category: category, username: username, id: id};

    try{
        const user = await User.findOne({username});

        if(user){
            const notes = await User.updateOne({username: username}, {$push: {notes: newNote}});
            res.status(200).json({message:'Note added'});
        }
        else{
            res.status(400).json({message:'User does not exist'});
        }
    }   
    catch(err){ 
        res.status(400).json({Error:"Error adding notes"});
    }
}

async function getNotes (req, res) {
    const username = req.params.username;
    console.log(username);

    try{
        const user = await User.findOne({username});

        if(user){
            const notes = user.notes;
            res.status(200).json({notes});
        }
        else{
            res.status(400).json({message:'User does not exist'});
        }
    }
    catch(err){

    }

}

async function deleteNote (req, res) {
    const username = req.params.username;
    const id = req.params.id;
    console.log("Delete:" + id);
    console.log("Delete:" + username);

    try{
        let user = await User.findOne({username});
        
        if(user){
            user.notes = user.notes.filter(note => note.id !== id);
            user.save();
            res.status(200).json({message:'Note deleted'});
        }
        else{
            res.status(400).json({message:'User does not exist'});
        }
    }
    catch(err){
        console.log(err);
    }
}


export default router;