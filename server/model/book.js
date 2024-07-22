import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    owner : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    title : String,
    author : String,
    genre : String,
    description : String,
    photos : [String],
})

export const Book = mongoose.model('Book', bookSchema);

