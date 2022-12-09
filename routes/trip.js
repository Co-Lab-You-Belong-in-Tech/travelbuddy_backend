import express from "express";
import {
  createTrip,
  updateTrip,
  deleteTrip,
  getTrip,
  getTrips,
} from "../controllers/Trip.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createTrip);
router.put("/:id", verifyAdmin, updateTrip);
router.delete("/find/:id", verifyAdmin, deleteTrip);
router.get("/:id", getTrip);
router.get("/", getTrips);

export default router;
