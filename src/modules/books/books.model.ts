import mongoose, { Schema } from "mongoose";
import { Genre, IBook } from "./books.interface";


interface BookDocument extends IBook, Document {}

const bookSchema = new Schema<BookDocument>({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
  },
  genre: {
    type: String,
    enum: Object.values(Genre),
    required: [true, 'Genre is required'],
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '', 
  },
  copies: {
    type: Number,
    required: [true, 'Copies count is required'],
    min: [0, 'Copies cannot be negative'],
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  available: {
    type: Boolean,
    default: true,
  },
},
{ timestamps: true });

bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};



const BookModel = mongoose.model<BookDocument>('Book', bookSchema);

export default BookModel;