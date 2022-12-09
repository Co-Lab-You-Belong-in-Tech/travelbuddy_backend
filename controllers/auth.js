import User from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

dotenv.config();
export const register = async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
    });
    await newUser.save();

    const accessToken = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET
    );
    const { isAdmin, ...others } = newUser._doc;
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
      })
      .status(200)

      .json({ ...others, accessToken });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    !user && createError("User not found", 404);

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { isAdmin, ...others } = user._doc;
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...others, isAdmin });
  } catch (err) {
    next(err);
  }
};

//  try {
//    const user = await User.findOne({
//      username: req.body.username,
//    });
//    if (!user) return next(createError(404, "User not found"));

//    const isEmailCorrect = await User.findOne({
//      email: req.body.email,
//    });
//    if (!isEmailCorrect)
//      return next(createError(400, "Wrong Username or Email"));

//    const token = jwt.sign(
//      { id: user._id, isAdmin: user.isAdmin },
//      process.env.JWT_SECRET
//    );

//    const { isAdmin, ...otherDetails } = user._doc;
//    res
//      .cookie("access_token", token, {
//        httpOnly: true,
//      })
//      .status(200)
//      .json(otherDetails, isAdmin);
//  } catch (err) {
//    next(err);
//  }
