import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import locationRoute from "./routes/location.js";
import attractionRoute from "./routes/attraction.js";
import tripRoute from "./routes/trip.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

(async () => {
  try {
    // await mongoose.connect(process.env.MONGODB_URL);
    await mongoose.connect(process.env.LOCAL_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
})();

mongoose.connection.on("disconnected", () => {
  console.log("DB Disconnected from MongoDB");
});
mongoose.connection.on("connected", () => {
  console.log("DB connected from MongoDB");
});

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/location", locationRoute);
app.use("/api/attraction", attractionRoute);
app.use("/api/trip", tripRoute);

app.listen(8080, async () => {
  console.log("Connected to Backend on Port 8080");
});
