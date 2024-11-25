import express from "express";
import dotenv from "dotenv";
dotenv.config();

//mongodb
import {MongoClient} from 'mongodb'
const uri = process.env.DB_URI;
const client = new MongoClient(uri);
const db = client.db('Upkeep');

const router = express.Router();

router.get("/",async(req,res)=>{
  const {hostel, email} = req.query;
  console.log(hostel);
  console.log(typeof(hostel));
  if(hostel){
    try{
      const collection = db.collection("logs");
      const data = await collection.find({hostel:hostel}).toArray();
      console.log(data)
      if (data.length>0) {
        res
          .status(200)
          .json({ message: "Data fetched", data:data});
        console.log("Cleaning data for admin fetched successfully");
          
      } else {
        console.log("No data found")
        res.status(401).json({ message: "No available cleaning request for admin" });
      }
  
    }catch(err){
      console.error("Error during data fetching",err);
      res.status(500).json({message: "Internal server error"});
    }

  }else if(email){
    try{
      const collection = db.collection("admin");
      const data = await collection.findOne({email:email});
      console.log(data)
      if (data) {
        res
          .status(200)
          .json({ message: "Data fetched", data:data});
        console.log("Admin data fetched successfully");
          
      } else {
        console.log("Admin data not found")
        res.status(401).json({ message: "Admin data not available" });
      }

    }catch(err){
      console.error("Error during data fetching",err);
      res.status(500).json({message: "Internal server error"});
    }
  }
})

export default router;