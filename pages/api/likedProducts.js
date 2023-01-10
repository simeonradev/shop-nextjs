const likedProductsIds = [];

export default (req, res) => {
  if (req.method === "POST") {
    const { id } = req.body;
    likedProductsIds.push(id);
    res.status(200).json({ likedProductsIds });
  } else if (req.method === "GET") {
    res.status(200).json({ likedProductsIds });
  } else {
    res.status(405).end();
  }
};
