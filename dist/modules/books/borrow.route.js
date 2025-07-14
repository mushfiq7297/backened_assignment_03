"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
const borrowRoute = (0, express_1.Router)();
borrowRoute.post("/api/borrow", borrow_controller_1.borrowBook);
borrowRoute.get("/api/borrow", borrow_controller_1.borrowedBooksSummary);
exports.default = borrowRoute;
