import express from "express";
import {
  createAttraction,
  updateAttraction,
  deleteAttraction,
  getAttraction,
  getAttractions,
} from "../controllers/Attraction.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/hotelid", verifyAdmin, createAttraction);

//update
router.put("/:id", verifyAdmin, updateAttraction);

//Delete
router.delete("/:id/:hotelid", verifyAdmin, deleteAttraction);

//Get
router.get("/:id", getAttraction);
router.get("/", getAttractions);

export default router;
