import mongoose from "mongoose";

const applicationsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+$/
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Developer"
  }
});

export default mongoose.model("Application", applicationsSchema);