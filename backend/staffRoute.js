import express from "express";
import dotenv from "dotenv";
dotenv.config();

//mongodb
import {MongoClient} from 'mongodb'
const uri = process.env.DB_URI;
const client = new MongoClient(uri);
const db = client.db('Upkeep');

const router = express.Router();

router.put("/", async (req, res) => {
  const {hostel, room_no, selected_slot, staffName } = req.body;

  if (!hostel || !room_no || !selected_slot || !staffName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Assuming you're using MongoDB
    const collection  = db.collection("logs")
    const result = await collection.findOneAndUpdate(
      { hostel,room_no }, // Find the request by room_no
      {$set: {selected_slot, staff: staffName , status:"Accepted"}}, // Update the selected_slot field
      { returnDocument: "after" } // Return the updated document
    );

    if (!result) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Slot updated successfully", data: result });
  } catch (error) {
    console.error("Error updating slot:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/",async(req,res)=>{
  const {hostel, floor, email} = req.query;
  // console.log(hostel,floor);
  // console.log(typeof(hostel),typeof(floorInt));
  if(email){
    try{
      const collection = db.collection("staff");
      const data = await collection.findOne({email:email});
      console.log(data)
      if (data) {
        res
          .status(200)
          .json({ message: "Data fetched", data:data});
        console.log("Staff data fetched successfully");
          
      } else {
        console.log("Staff data not found")
        res.status(401).json({ message: "Staff data not available" });
      }

    }catch(err){
      console.error("Error during staff's data fetching",err);
      res.status(500).json({message: "Internal server error"});
    }
  }else if(hostel){

    try{
      let floorInt = parseInt(floor);
      const collection = db.collection("logs");
      const data = await collection.find({hostel:hostel,floor:floorInt}).toArray();
      // console.log(data)
      if (data.length>0) {
        res
          .status(200)
          .json({ message: "Data fetched", data:data});
        console.log("Cleaning Data fetched successfully");
          
      } else {
        // console.log("No data found")
        res.status(401).json({ message: "No available cleaning request" });
      }
  
    }catch(err){
      console.error("Error during data fetching",err);
      res.status(500).json({message: "Internal server error"});
    }
  }
})

export default router;