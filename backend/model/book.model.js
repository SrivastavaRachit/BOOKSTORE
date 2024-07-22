import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name : String,
    price : Number,
    category : String,
    image : String,
    title: String,
})

// Create Model and store it in book
const Book = mongoose.model("Book", bookSchema);

export default Book;