import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Theater from "../models/Theater.js";

export const addTheater = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" });
  }

  let adminId;

  // verify token
  jwt.verify(extractedToken, 'mongodb123', (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //create new theater
  const { theaterName, city, capacity, price} =
    req.body;
  if (
    !theaterName &&
    theaterName.trim() === "" &&
    !city &&
    city.trim() == "" &&
    !capacity &&
    !price
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let theater;
  try {
    theater = new Theater({
      theaterName,
      city,
      capacity,
      price,
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await theater.save({ session });
    //adminUser.addedTheaters.push(theater);
    //await adminUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!theater) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ theater });
};

export const getAllTheaters = async (req, res, next) => {
  let theaters;
  console.log("get all theater");
  try {
    theaters = await Theater.find();
    console.log("shakshi all theater",theaters);
  } catch (err) {
    return console.log(err);
  }

  if (!theaters) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ theaters });
};

export const getTheaterById = async (req, res, next) => {
  const id = req.params.id;
  console.log("shakshi theater by id:",id);
  let theater;
  try {
    theater = await Theater.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!theater) {
    console.log("theater id not found");
    return res.status(404).json({ message: "Invalid Theater ID" });
  }

  return res.status(200).json({ theater });
};

export const editTheater = async (req, res, next) => {
  const theaterId = req.params.id;
  const { updatedData } = req.body;
  console.log("updateuser:",theaterId, updatedData);

  try {
    const result = await Theater.findByIdAndUpdate(theaterId, { ...updatedData }, { new: true });
    console.log("Updated Sucessfully:", result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
    return console.log(error);
  }
};

export const deleteTheater = async (req, res, next) => {
  const id = req.params.id;
  let theater;
  try {
    theater = await Theater.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!theater) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};