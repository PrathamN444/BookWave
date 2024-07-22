import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    book : {type : mongoose.Schema.Types.ObjectId , ref : "Book"},
    user : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    rating : Number,
    comment : String,
})

export const Review = mongoose.model('Review', reviewSchema);