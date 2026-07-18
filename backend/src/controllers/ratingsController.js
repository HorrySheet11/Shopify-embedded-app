


export async function getRating(req, res) {
  const response = await getItemRating(parseInt(req.params.id, 10));
  return res.json(response);
}

export async function postRating(req, res) {
  // const response = await postItemRating(req.body);
  console.log(req.body);
  return res.json(response);
}