import mongoose from 'mongoose';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import session from 'express-session';
import bodyParser from 'body-parser';
import User from '../models/User.js';
import speakeasy from 'speakeasy';



const Schema = mongoose.Schema;
let db = mongoose.connection;

let router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));
router.use(bodyParser.json());

router.use(session({
    secret: 'some secret here',
    resave: true,
    saveUninitialized: true
}));

router.post('/register', express.json(),userRegister);
router.post('/login', express.json(),userLogin);
router.post('/verify', express.json(), verifyOTP);

function auth(req, res, next){
    if(!req.session.loggedin){
        res.status(401).json({message: 'Not logged in'});
    }
    next();
}

async function userRegister(req, res){


    let username = req.body.username;
    let password = req.body.password;;
    let cards = [];
    
    
    try{
        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        else{
            //const salt = await bcrypt.genSalt();
            //const hashedPassword = await bcrypt.hash(password, salt);
            const temp_secret = speakeasy.generateSecret();
            const newUser = {username, password: password, cards, secret: {base32: temp_secret.base32 , qrcode: temp_secret.otpauth_url}, notes: [], todo:[] };
            const savedUser = await User.create(newUser);
            req.session.user = savedUser;
            req.session.loggedin = true;
            console.log(savedUser);
            res.status(201).json({message: 'User created', user: req.session.user});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

async function userLogin(req, res){
    if(req.session.loggedin){
        res.status(200).json({message: 'Already logged in'});
    }
    let username = req.body.username;
    let password = req.body.password;
 

    try{
        const user = await User.findOne({username : username, password: password});
        req.session.user = user;
        if(!user){
            res.status(400).json({message: 'User does not exist'});
        }
        else{
            console.log(user)
            req.session.loggedin = true;
            req.session.username = req.body.username;
            res.status(200).json({message: 'User exists', user: req.session.user})
        }
    }
    catch(error){
        res.json({"message": "Login error"});
    }
    

}

// Verift token and make secret permanent

async function verifyOTP(req, res){
    const {token, username} = req.body;

    try{
        const user = await User.findOne({username});

        if(!user){
            res.status(400).json({message: 'User does not exist'});
        }
        else{
            const base32 = user.secret.base32;
            const verified = speakeasy.totp.verify({
                secret: base32,
                encoding: 'base32',
                token: token
            });

            if(verified){
                res.json({verified:true});
            }
            else{
                res.json({verified:false});
            }
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}




export default router;