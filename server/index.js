import express from "express";
import { connectToDB } from "./data/database.js";
import dotenv from "dotenv";
import { User } from "./model/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "./utils/features.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import imageDownloader from "image-downloader";
import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";
import fs from 'fs';
import { Book } from "./model/book.js";

dotenv.config();
const app = express();

connectToDB();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const salt = await bcrypt.genSalt(10);


app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    "origin": "https://book-wave-frontend.vercel.app",
    "methods": ['POST', 'GET', 'DELETE', 'PUT'],
}))


app.get("/test" , (req, res) => {
    res.json("test ok");
})

app.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;
        let userDoc = await User.findOne({email});
        if(!userDoc){
            return res.status(500).json("user don't exists");
        }
        const valid = bcrypt.compare(password, userDoc.password);
        if(!valid){
            return res.status(500).json("wrong email or password");
        }
        sendCookie(userDoc, res);
    }
    catch(err){
        console.log(err);
    }
})

app.post("/register", async (req, res) => {
    try{
        const {name, email, password} = req.body;
        let userDoc = await User.findOne({email});
        if(userDoc){
            return res.status(501).json("already a user");
        }
        const hashed_password = await bcrypt.hash(password, salt);
        userDoc = await User.create({name, email, password : hashed_password});
        sendCookie(userDoc, res);
    }
    catch(err){
        console.log(err);
    }
})

app.get("/profile", (req, res) => {
    try{
        const {token} = req.cookies;
        if(token){
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, user) => {
                if(err) throw err;
                const userDoc = await User.findById(user.id);
                res.json(userDoc);
            })
        }
        else{
            res.json(null);
        }
    }
    catch(err){
        console.log(err);
    }
})

app.post("/logout", (req, res) => {
    try{
        res.cookie('token', '').json("logged out !");
    }
    catch(err) {
        console.log(err);
    }
})

app.post("/upload-by-link", async (req, res) => {
    try {
        const {link} = req.body;
        const filename = 'photo' + Date.now() + '.jpg';
        const pathToPhoto = __dirname + '/uploads/' + filename; 
        await imageDownloader.image({
            url : link,
            dest : pathToPhoto,
        })
        res.json(filename);
    } 
    catch(error){
        console.log(error);
    }
})

const uploadPhotosMiddleware = multer({dest: "uploads/"});
app.post("/upload", uploadPhotosMiddleware.array('photos', 100), (req, res) => {
    try{
        const uploadedPhotos = [];
        for(let i=0; i<req.files.length; i++){
            const {originalname, path, filename} = req.files[i];
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
            uploadedPhotos.push(filename + '.' + ext);
        }
        res.json(uploadedPhotos);
    }
    catch(err){
        console.log(err);
    }
});

app.post("/books", (req, res) => {
    try{
        const {token} = req.cookies;
        const {title, author, genre, description, photos} = req.body;
        if(token){
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, data) => {
                if(err) throw err;
                const bookDoc = await Book.create({owner: data.id, title, author, genre, description, photos});
                res.json(bookDoc);
            })
        }
    }
    catch(err){
        console.log(err);
    }
})

app.put("/books", (req, res) => {
    try{
        const {token} = req.cookies;
        const {id, title, author, genre, description, photos} = req.body;
        if(token){
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
                if(err) throw err;
                const bookDoc = await Book.findById(id);
                if(userData.id === bookDoc.owner.toHexString()){           // we can also toString()
                    bookDoc.set({title, author, genre, description, photos});
                    await bookDoc.save();
                }
                res.json(bookDoc);
            })
        }
    }
    catch(err){
        console.log(err);
    }
})

app.get("/books", async (req, res) => {
    try{
        res.json(await Book.find());
    }
    catch(err){
        console.log(err);
    }
})

app.get("/user-books", (req, res) => {
    try{
        const {token} = req.cookies;
        if(token){
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
                if(err) throw err;
                const {id} = userData;
                const userDoc = await Book.find({owner : id});
                res.json(userDoc);
            })
        }
    }
    catch(err){
        console.log(err);
    }
})

app.get("/books/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const bookDoc = await Book.findById(id);
        res.json(bookDoc);
    }
    catch(err){
        console.log(err);
    }
})

app.post("/:id/reviews", (req, res) => {
    try{
        const {token} = req.cookies;
        if(token){
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
                if(err) throw err;
                const {rating, comment} = req.body; 
                const book = await Book.findById(req.params.id);
                book.reviews.push({ user : userData.name, rating, comment });
                await book.save();
                res.json(book);
            })
        }
    }
    catch(err){
        console.log(err);
    }
})


app.listen(4000);