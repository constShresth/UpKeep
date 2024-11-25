import express from "express";
import dotenv from "dotenv";
dotenv.config();

import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET_KEY;

//mongodb
import {MongoClient} from 'mongodb'
const uri = process.env.DB_URI;
const client = new MongoClient(uri);
const db = client.db('Upkeep');

const router = express.Router();

const redirects = {
  admin: "/admin/home",
  resident: "/resident/home",
  staff: "/staff/home",
};

router.post("/", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    // Select collection based on role
    const Collection = db.collection(role)
    // console.log(Collection.namespace)
    // Find the user in the appropriate collection
    const user = await Collection.findOne({ email:email, password:password });
    if (user) {
      // Redirect based on role
      const token = jwt.sign(
        { email: user.email, role: user.role }, // Payload (user info)
        secretKey, // Secret key for signing
        { expiresIn: '1h' } // Token expiration (1 hour in this case)
      );
      res
        .status(200)
        .json({ message: "Login successful", redirect: redirects[role] ,token:token, role:role, email:email});
      console.log("login successful");
        
    } else {
      console.log("invalid")
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;