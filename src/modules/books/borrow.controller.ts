import { Request, Response } from "express";
import BookModel from "./books.model";
import BorrowModel from "./borrow.model";
import { BookDocument } from "./books.interface";


export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await BookModel.findById(bookId) as BookDocument
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    if (book.copies < quantity) {
      return res.status(400).json({ success: false, message: "Not enough copies available" });
    }


    book.copies -= quantity;

 
    book.updateAvailability();
    await book.save();


    const borrow = new BorrowModel({ book: bookId, quantity, dueDate });
    const data = await borrow.save();

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Book borrowing failed",
      error: error.message,
    });
  }
};


export const borrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    const data = await BorrowModel.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve summary",
      error: error.message,
    });
  }
};
