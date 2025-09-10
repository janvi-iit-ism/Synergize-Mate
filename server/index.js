import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import axios from "axios";


const app = express();

dotenv.config();

// middleware, express.json()-This middleware function extracts the JSON payload from the incoming request and makes it available on req.body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "https://wil-team-client.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

// const __dirname = path.resolve();

const PORT = process.env.PORT || 8000;

// api's
app.use("/api/v1/user", userRoute);


app.listen(PORT, (err) => {
  if (err) console.log(err);

  connectDB();
  console.log(`running successfully at ${process.env.PORT}`);
});

// http://localhost:2600/
