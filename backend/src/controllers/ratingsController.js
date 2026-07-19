import { getItemRating, postItemRating } from "../models/Rate.js";


export async function getRating(req, res) {
  const {id} = req.params
  const response = await getItemRating(parseInt(id, 10));
  return res.json(response);
}

export async function postRating(req, res) {
  console.log(req.body);
  const response = await postItemRating(req.body);
  console.log(`response: ${JSON.stringify(response)}`);
  return res.json(response);
}