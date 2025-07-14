import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import config from "./config";
import mongoose from "mongoose";
import bookRoute from './modules/books/books.routes';
import borrowRoute from './modules/books/borrow.route';



const app = express();

app.use(cors());
app.use(express.json());

app.use(bookRoute);
app.use(borrowRoute);


app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});


app.get("/", (req, res) =>{
    res.send({success:true, massage:"I am here!"})
})

async function server() {
  try {
    if (!config.database_url) {
      throw new Error(' DATABASE_URL is missing!');
    }
    await mongoose.connect(config.database_url);
    console.log(`✅ Connected to database`);
  } catch (error) {
    console.error(`Server error:`, error);
  }
}

server();