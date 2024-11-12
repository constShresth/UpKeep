import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET_KEY;
import {MongoClient} from 'mongodb'
const uri = process.env.DB_URI;
const client = new MongoClient(uri);
const db = client.db('Upkeep');
const app = express();
const port = 3001; // Changed to avoid conflicts

import login from "./login.js";

app.use(express.json());
app.use(cors());
app.use("/login",login);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
