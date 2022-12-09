import Trip from "../models/Trip.js";

//Creating a Trip
export const createTrip = async (req, res) => {
  const newTrip = new Trip(req.body);

  try {
    const savedTrip = await newTrip.save();
    res.status(200).json(savedTrip);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Updating a Trip
export const updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTrip);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Deleting a Trip
export const deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json("Trip has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

//Getting a Trip
export const getTrip = async (req, res) => {
  try {
    const Trip = await Trip.findById(req.params.id);
    res.status(200).json(Trip);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Getting all Trips
export const getTrips = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const Trips = await Trip.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(Trips);
  } catch (err) {
    next(err);
  }
};
