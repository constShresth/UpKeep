import express from "express";
import dotenv from "dotenv";
dotenv.config();

//mongodb
import {MongoClient, ObjectId} from 'mongodb'
const uri = process.env.DB_URI;
const client = new MongoClient(uri);
const db = client.db('Upkeep');

const router = express.Router();


function getTodayDate() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00
  return today;
}


router.post("/", async (req, res) => {
  const { roll_no, slots, areas, floor, hostel, room_no } = req.body;
  let floorInt = parseInt(floor);
  const newRequest = {
    roll_no:roll_no,
    slots:slots,
    areas:areas,
    status: "Unaccepted", // Default status
    date: new Date(),    // Current date
    floor:floorInt,
    hostel:hostel,
    room_no:room_no,
    selected_slot: "",   // Empty by default
    staff: "",           // Empty by default
  };
  try {
    // Select collection based on role
    const Collection = db.collection("logs")
    // console.log(Collection.namespace)
    // Find the user in the appropriate collection
    const result = await Collection.insertOne(newRequest);
    if (result) {
      // Redirect based on role
      console.log(result)
      res
        .status(200)
        .json({id:result.insertedId, message: "Cleaning data added successfully"});
      console.log("Cleaning data addition successful");
        
    } else {
      console.log("failed")
      res.status(401).json({ message: "Cleaning data wasn't added" });
    }
  } catch (err) {
    console.error("Error during cleaning data insertion:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/",async(req,res)=>{
  const {roll_no, email} = req.query;
  if(roll_no){
    const today = getTodayDate();
    const rollNo = Number(roll_no);
    console.log(typeof(rollNo))
    try{
      const collection = db.collection("logs");
      const data = await collection.findOne({roll_no:rollNo,  date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }});
      const allCleaningRequest =  await collection.find({roll_no:rollNo}).toArray();
      console.log(data)
      console.log(allCleaningRequest)
      if (data && allCleaningRequest.length > 0) {
        res.status(200).json({
          message: "All data fetched",
          data: data,
          allCleaningRequest: allCleaningRequest
        });
        console.log("Fetched everything successfully");
      } else if (data) {
        res.status(200).json({
          message: "Cleaning data fetched",
          data: data
        });
        console.log("Cleaning data fetched successfully");
      } else if (allCleaningRequest.length > 0) {
        res.status(200).json({
          message: "All cleaning data fetched",
          allCleaningRequest: allCleaningRequest
        });
        console.log("All cleaning data fetched successfully");
      } else {
        console.log("No past data found");
        res.status(401).json({ message: "No past data present" });
      }
      
      // if (data && allCleaningRequest) {
      //   res
      //     .status(200)
      //     .json({ message: "All data fetched", data:data, allCleaningRequest:allCleaningRequest});
      //   console.log("Fetched everything successfully");
          
      // }
      // elseif (data) {
      //   res
      //     .status(200)
      //     .json({ message: "Cleaning data fetched", data:data});
      //   console.log("Cleaning data fetched successfully");
          
      // } 
      // elseif (allCleaningRequest) {
      //   res
      //     .status(200)
      //     .json({ message: "All cleaning data fetched", allRequests:allCleaningRequest});
      //   console.log("All cleaning data fetched successfully");
          
      // }else {
      //   console.log("No past data found")
      //   res.status(401).json({ message: "No past data present" });
      // }
      
  
    }catch(err){
      console.error("Error during request data fetching",err);
      res.status(500).json({message: "Internal server error"});
    }
  }
  else if(email){
    try{
      const collection = db.collection("resident");
      const data = await collection.findOne({email:email});
      console.log(data)
      if (data) {
        res
          .status(200)
          .json({ message: "Data fetched", data:data});
        console.log("Resident data fetched successfully");
          
      } else {
        console.log("Resident data not found")
        res.status(401).json({ message: "Resident data not available" });
      }

    }catch(err){
      console.error("Error during data fetching",err);
      res.status(500).json({message: "Internal server error"});
    }
  }
})

router.delete("/", async(req,res)=>{
  const { id } = req.query; // Ensure `id` is passed in the request body or query parameters
  console.log(id,typeof(id))
  try {
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid request ID" });
    }

    const collection = db.collection("logs"); // Get the collection

    // Delete the document with the specified ID
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.patch('/', async (req, res) => {
  const { id } = req.query;
  const { status } = req.body;
  console.log(id, typeof(id));
  console.log(status, typeof(status))

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const collection = db.collection("logs")
    const updatedRequest = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) }, // Query to match the document
      { $set: { status: status } }, // Update operation
      { returnDocument: "after" } // Option to return the updated document
    );
    console.log(updatedRequest.value)
    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    
    res.status(200).json({ message: "Request updated successfully", data: updatedRequest.value });
    
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;