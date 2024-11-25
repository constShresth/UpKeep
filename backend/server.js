import express from "express";
import cors from "cors";

const app = express();
const port = 3001; 

import loginRoute from "./loginRoute.js";
import staffRoute from  "./staffRoute.js";
import adminRoute from "./adminRoute.js"
import residentRoute from "./residentRoute.js"

app.use(express.json());
app.use(cors());
app.use("/login",loginRoute);
app.use("/staff/home",staffRoute);
app.use("/admin/home",adminRoute);
app.use("/resident/home",residentRoute);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
