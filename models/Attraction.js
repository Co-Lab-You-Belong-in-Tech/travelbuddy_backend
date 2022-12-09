import mongoose from "mongoose";

const AttractionSchema = new mongoose.Schema(
  {
    place: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviews: {
      type: [String],
    },

    desc: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Attractions", AttractionSchema);
