"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getBook = exports.registerBook = void 0;
const books_model_1 = __importDefault(require("./books.model"));
//create book data
const registerBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const book = new books_model_1.default(payload);
        const data = yield book.save();
        res.send({
            success: true,
            message: "Book created successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "Book creation failed",
            error,
        });
    }
});
exports.registerBook = registerBook;
//get all books
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, // genre value (e.g., FANTASY)
        sortBy = "createdAt", sort = "desc", limit, // optional
         } = req.query;
        // Build filter object
        const filterObj = {};
        if (filter) {
            filterObj.genre = filter;
        }
        // Determine sort order
        const sortOrder = sort === "asc" ? 1 : -1;
        // Build query
        let query = books_model_1.default.find(filterObj).sort({ [sortBy]: sortOrder });
        // Apply limit if provided
        if (limit) {
            query = query.limit(Number(limit));
        }
        const data = yield query;
        res.send({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to retrieve books",
            error,
        });
    }
});
exports.getBook = getBook;
//get book by id
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield books_model_1.default.findById(bookId);
        res.send({
            success: true,
            message: "Book created successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "Book creation failed",
            error,
        });
    }
});
exports.getBookById = getBookById;
//update book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield books_model_1.default.findByIdAndUpdate(bookId, req.body, { new: true, runValidators: true });
        res.send({
            success: true,
            message: "Book updated successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "Book update failed",
            error,
        });
    }
});
exports.updateBook = updateBook;
//delete book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const data = yield books_model_1.default.findByIdAndDelete(bookId);
    res.send({
        success: true,
        message: "Book deleted successfully",
        data,
    });
});
exports.deleteBook = deleteBook;
