import clientPromise from "../../mongodb";

let likedProductsIds = [];

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("didi-shop-db");

  if (req.method === "POST") {
    const { id } = req.body;
    likedProductsIds.push(id);
    try {
      await db
        .collection("likedProductsIds")
        .insertOne({ _id: "user1", productIds: [id] });
    } catch (error) {
      await db
        .collection("likedProductsIds")
        .updateOne({ _id: "user1" }, { $push: { productIds: id } });
    }
    res.status(200).json({ likedProductsIds });
  } else if (req.method === "GET") {
    const allPosts = await db
      .collection("likedProductsIds")
      .findOne({ _id: "user1" });
    // .toArray();
    res.status(200).json({ likedProductsIds: allPosts.productIds });
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    const newLikedProductsIds = likedProductsIds.filter(
      (productId) => productId !== id
    );
    likedProductsIds = newLikedProductsIds;
    await db
      .collection("likedProductsIds")
      .updateOne({ _id: "user1" }, { $pull: { productIds: id } });
    res.status(200).json({});
  } else {
    res.status(405).end();
  }
}
