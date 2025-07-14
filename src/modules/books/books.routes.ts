import { Router } from "express";
import { deleteBook, getBook, getBookById, registerBook, updateBook } from "./books.controller";



const bookRoute = Router();

bookRoute.post("/api/books",registerBook);
bookRoute.get("/api/books",getBook);
bookRoute.get("/api/books/:bookId",getBookById);
bookRoute.patch("/api/books/:bookId",updateBook);
bookRoute.delete("/api/books/:bookId",deleteBook);


export default bookRoute;