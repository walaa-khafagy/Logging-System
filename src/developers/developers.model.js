import mongoose from "mongoose";
import bcrypt from "bcrypt";


const developersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 5
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      },
      message: "Invalid email pattern."
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },

  apiKey: {
    type: String,
    required: true
  }
});

developersSchema.pre("save", async function() {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("Developer", developersSchema);