import Attraction from "../models/Attraction.js";
import Location from "../models/Location.js";
// import { createError } from '../utils/error.js';

export const createAttraction = async (req, res, next) => {
  const locationId = req.params.locationid;
  const newAttraction = new Attraction(req.body);

  try {
    const savedAttraction = await newAttraction.save();
    try {
      await Location.findByIdAndUpdate(locationId, {
        $push: {
          Attractions: savedAttraction._id,
        },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedAttraction);
  } catch (err) {
    next(err);
  }
};

export const updateAttraction = async (req, res) => {
  try {
    const updatedAttraction = await Location.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedAttraction);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Deleting a Attraction
export const deleteAttraction = async (req, res, next) => {
  const LocationId = req.params.Locationid;
  try {
    await Attraction.findByIdAndDelete(req.params.id);
    try {
      await Location.findByIdAndUpdate(LocationId, {
        $pull: {
          Attractions: req.params._id,
        },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Attraction has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

//Getting a Attraction
export const getAttraction = async (req, res) => {
  try {
    const Attraction = await Attraction.findById(req.params.id);
    res.status(200).json(Attraction);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Getting all Attractions
export const getAttractions = async (req, res, next) => {
  try {
    const Attractions = await Location.find();
    res.status(200).json(Attractions);
  } catch (err) {
    next(err);
  }
};
