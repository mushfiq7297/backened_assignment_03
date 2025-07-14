import { request, Request, response, Response } from "express";
import BookModel from "./books.model";

//create book data
 const registerBook = async (req:Request, res:Response) => {
  try {
    const payload = req.body;

    const book = new BookModel(payload);
    const data = await book.save(); 

    res.send({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error: any) {
    res.send({
      success: false,
      message: "Book creation failed",
      error,
    });
  }
};

//get all books
const getBook = async (req: Request, res: Response) => {
  try {
    const {
      filter,       // genre value (e.g., FANTASY)
      sortBy = "createdAt",
      sort = "desc",
      limit,        // optional
    } = req.query;

    // Build filter object
    const filterObj: { genre?: string } = {};
    if (filter) {
      filterObj.genre = filter as string;
    }

    // Determine sort order
    const sortOrder = sort === "asc" ? 1 : -1;

    // Build query
    let query = BookModel.find(filterObj).sort({ [sortBy as string]: sortOrder });

    // Apply limit if provided
    if (limit) {
      query = query.limit(Number(limit));
    }

    const data = await query;

    res.send({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Failed to retrieve books",
      error,
    });
  }
};

//get book by id
const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId
    const data = await BookModel.findById(bookId); 

    res.send({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error: any) {
    res.send({
      success: false,
      message: "Book creation failed",
      error,
    });
  }
};

//update book
const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId
    const data = await BookModel.findByIdAndUpdate(bookId, req.body, {new:true, runValidators:true}); 

    res.send({
      success: true,
      message: "Book updated successfully",
      data,
    });
  } catch (error: any) {
    res.send({
      success: false,
      message: "Book update failed",
      error,
    });
  }
};

//delete book
const deleteBook = async (req: Request, res: Response) => {

    const bookId = req.params.bookId
    const data = await BookModel.findByIdAndDelete(bookId); 

    res.send({
      success: true,
      message: "Book deleted successfully",
      data,
    });
  
};
 



export {registerBook, getBook, getBookById, updateBook, deleteBook}
