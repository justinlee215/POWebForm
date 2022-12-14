const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String },
    author: { type: String },
});

const Book = mongoose.model('Book', BookSchema);

module.exports = {
    BookSchema,
    Book,
}