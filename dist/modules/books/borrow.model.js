"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const borrowSchema = new mongoose_1.default.Schema({
    book: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true },
}, { timestamps: true });
const BorrowModel = mongoose_1.default.model("Borrow", borrowSchema);
exports.default = BorrowModel;
