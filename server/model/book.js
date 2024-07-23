import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: String,
    rating: Number,
    comment: String,
});

const bookSchema = new mongoose.Schema({
    owner : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    title : String,
    author : String,
    genre : String,
    description : String,
    photos : [String],
    reviews: [reviewSchema],
})

export const Book = mongoose.model('Book', bookSchema);

