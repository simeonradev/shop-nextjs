import clientPromise from "../../mongodb";

let likedProductsIds = [];

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("didi-shop-db");

  if (req.method === "POST") {
    const { id, userId } = req.body;
    likedProductsIds.push(id);

    try {
      await db
        .collection("likedProductsIds")
        .insertOne({ _id: userId, productIds: [id] });
    } catch (error) {
      await db
        .collection("likedProductsIds")
        .updateOne({ _id: userId }, { $push: { productIds: id } });
    }
    res.status(200).json({ likedProductsIds });
  } else if (req.method === "GET") {
    const { query } = req;
    const { userId } = query;

    const findUser = await db
      .collection("likedProductsIds")
      .findOne({ _id: userId });

    res.status(200).json({ likedProductsIds: findUser?.productIds });
  } else if (req.method === "DELETE") {
    const { id, userId } = req.body;

    await db
      .collection("likedProductsIds")
      .updateOne({ _id: userId }, { $pull: { productIds: id } });

    res.status(200).json({});
  } else {
    res.status(405).end();
  }
}
