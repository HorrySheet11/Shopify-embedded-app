import {Router} from "express";
import * as ratingsController from "../controllers/ratingsController.js";

const ratingRouter = Router();

ratingRouter.get('/get:id', ratingsController.getRating);
ratingRouter.post('/product', ratingsController.postRating);

export default ratingRouter;