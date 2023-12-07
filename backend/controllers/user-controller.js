import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Bookings from "../models/Bookings.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const signup = async (req, res, next) => {
  const { name, email, username, password, membership } = req.body;
  console.log(req.body);
  
  if (!name || !email || !username || !password || !membership) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password);
    const newUser = new User({ name, email, username, password: hashedPassword,membershipType:membership });
    const savedUser = await newUser.save();

    return res.status(201).json({ id: savedUser._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};
export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const { updatedData } = req.body;
  console.log("updateuser:",userId, updatedData);

  try {
    const result = await User.findByIdAndUpdate(userId, { ...updatedData }, { new: true });
    console.log("Updated Sucessfully:", result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
    return console.log(errr);
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "Deleted Successfully" });
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  if (!username && username.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ username });
    console.log(existingUser);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Unable to find user from this ID" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res
    .status(200)
    .json({ message: "Login Successfull", id: existingUser._id });
};

export const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;
  let bookings;
  try {
    bookings = await Bookings.find({ userId: id })
      .populate("movieId")
      .populate("theaterId")
      .populate("userId");
  } catch (err) {
    return console.log(err);
  }
  if (!bookings) {
    return res.status(500).json({ message: "Unable to get Bookings" });
  }
  return res.status(200).json({ bookings });
};

export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ user });
};