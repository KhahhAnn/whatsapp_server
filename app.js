import express from "express";
import userRouter from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";

dotenv.config({
   path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

const app = express();
connectDB(mongoURI)

app.use("/user", userRouter);

const test = (req, res) => {
   res.send("Hello world");
}
app.get("/", test)

app.listen(port, () => {
   console.log("Server is running on port ", port);   
})