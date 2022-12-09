import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    unique: true,
  },
  attractions: {
    type: [String],
  },
});

export default mongoose.model("Location", LocationSchema);
