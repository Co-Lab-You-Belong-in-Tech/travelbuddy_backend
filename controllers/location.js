import Location from "../models/Location.js";
import Attraction from "../models/Attraction.js";

//Creating a Location
export const createLocation = async (req, res) => {
  const newLocation = new Location(req.body);

  try {
    const savedLocation = await newLocation.save();
    res.status(200).json(savedLocation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Updating a Location
export const updateLocation = async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedLocation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Deleting a Location
export const deleteLocation = async (req, res) => {
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.status(200).json("Location has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

//Getting a Location
export const getLocation = async (req, res) => {
  try {
    const Location = await Location.findById(req.params.id);
    res.status(200).json(Location);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Getting all Locations
export const getLocations = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const Locations = await Location.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(Locations);
  } catch (err) {
    next(err);
  }
};

export const getAttraction = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);
    const list = await Promise.all(
      location.attraction.map((attraction) => {
        return Attraction.findById(attraction);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
