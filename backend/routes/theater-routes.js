import express from "express";
import Theater from "../models/Theater.js";
import {
  addTheater,
  getAllTheaters,
  getTheaterById,
  editTheater,
  deleteTheater,
} from "../controllers/theater-controller.js";
const theaterRouter = express.Router();
theaterRouter.get("/", getAllTheaters);
theaterRouter.get("/:id", getTheaterById);
theaterRouter.put("/:id", editTheater);
theaterRouter.post("/", addTheater);
theaterRouter.delete("/:id", deleteTheater);

theaterRouter.put('/:id', async (request, response) => {
  try {
      console.log(request.body);
      if (
          !request.body.theatreName || !request.body.city 
      ) {
          return response.status(400).send({
              message : 'Send all required fields'
          });
      }
      const { id } = request.params;
      const theatre = await Theater.findByIdAndUpdate(id, request.body);
      if (!theatre) {
          return response.status(404).json({ message : 'Theatre not found.'});
      }
      return response.status(200).json({ message : 'Theatre updated successfully.'});

  } catch (error) {
      console.log(error.message);
      response.status(500).send({message : error.message});
  }
});

theaterRouter.delete('/:id', async (request, response) => {
  try {
      const { id }  = request.params;
      const theatre = await Theater.findByIdAndDelete(id);
      if(!theatre){
          return response.status(404).json({ message : 'Theatre not found'});
      }
      return response.status(200).json({ message : 'Theatre deleted successfully'});
  } catch (error) {
      console.log(error.message);
      response.status(500).send({message : error.message});
  }
});

export default theaterRouter; 
