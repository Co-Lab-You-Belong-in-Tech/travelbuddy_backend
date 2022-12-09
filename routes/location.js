import express from "express";
import {
  createLocation,
  updateLocation,
  deleteLocation,
  getLocation,
  getLocations,
  getAttraction,
} from "../controllers/Location.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createLocation);
router.put("/:id", verifyAdmin, updateLocation);
router.delete("/find/:id", verifyAdmin, deleteLocation);
router.get("/:id", getLocation);
router.get("/", getLocations);
router.get("/attraction/:id", getAttraction);

export default router;
