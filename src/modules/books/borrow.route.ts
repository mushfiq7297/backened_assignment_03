import { Router } from "express";
import { borrowBook, borrowedBooksSummary } from "./borrow.controller";

const borrowRoute = Router();


borrowRoute.post("/api/borrow", borrowBook);


borrowRoute.get("/api/borrow", borrowedBooksSummary);

export default borrowRoute;
