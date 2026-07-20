import {Router} from "express";
import * as ratingsController from "../controllers/ratingsController.js";

const ratingRouter = Router();
/**
 * @openapi
 * /rate/:id:
 *   get:
 *     summary: get product rating
 *     description: Fetches given product rating.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A successful response will return the product rating average.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
ratingRouter.get('/:id', ratingsController.getRating);
/**
 * @openapi
 * /rate/product:
 *   post:
 *     summary: posts product rating
 *     description: posts given product rating using product id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               name:
 *                 type: string
 *               rating:
 *                 type: integer
 *     responses:
 *       200:
 *         description: A successful response will return the result of the post.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   rating:
 *                     type: integer
 */
ratingRouter.post('/product', ratingsController.postRating);

export default ratingRouter;