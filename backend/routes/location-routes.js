import express from "express";
import Theater from "../models/Theater.js";

const locationRouter = express.Router();


locationRouter.get('/', async (request, response) => {
  try {
      console.log("get all cities............");
      const locations = await Theater.distinct('city');
      return response.status(200).json(locations);
  } catch (error) {
      console.log(error.message);
      response.status(500).send({message : error.message});
  }
});

locationRouter.get("/:place", async (request, response) => {
  try {
      console.log("place:",request.params.place);
      const place = request.params.place;
      console.log("place:",place);
      const theaters = await Theater.find({ city : place});
      console.log("theaters:",theaters);
      return response.status(200).json({theaters});
  } catch (error) {
      console.log(error.message);
      response.status(500).send({message : error.message});
  }
});

export default locationRouter;
