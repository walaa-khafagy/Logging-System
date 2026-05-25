import Developer from "./developers.model.js";
import jwt from "jsonwebtoken";
import generateApiKey from "../utils/generateApiKey.js";
import bcrypt from "bcrypt";


export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const apiKey = generateApiKey();

    const user = await Developer.create({ username, email, password, apiKey });

    res.status(201).json({  message: "User registered successfully",  apiKey   });

  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Developer.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Wrong email" });
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return res.status(401).json({ message: "Wrong password"});
    }

    const token = jwt.sign( { id: user._id }, process.env.JWT_SECRET);

    res.json({  token });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};