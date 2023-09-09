import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import todoRoutes from './routes/todos.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import helmet from 'helmet';




dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);
app.use(cors(
    {
        origin:"*"
    }
));

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.urlencoded({extended: true}));;
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

/* Mongoose setup */


import User from './models/User.js';
import Card from './models/Card.js';
import {users, cards} from './data/objects.js';

console.log("hey");
/*ROUTES*/
app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);
app.use("/todos", todoRoutes);




const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() =>{
    /* ADD DATA ONE TIME UPON STARTUP */
    // User.insertMany(users);
    // Card.insertMany(cards);
})


.catch((error) => console.log(`${error} did not connect`));
app.listen(3000, () => console.log(`Server running on port: 3000`));

