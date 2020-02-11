const mongoose = require('mongoose')
const Schema = mongoose.Schema



const bookSchema = new Schema({
    authors: String,
    publisher: String,
    title: String,
    publishedDate: Date,
    pageCount :Number
    
})

const Book = mongoose.model("book", bookSchema)

module.exports = Book



