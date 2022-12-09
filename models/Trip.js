import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },

    travelBuddies: {
      type: [String],
      required: true,
    },
    photos: {
      type: [String],
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Trip", TripSchema);
