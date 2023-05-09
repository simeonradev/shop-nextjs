import clientPromise from "../../mongodb";

let recentlyViewedProducts = [];

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("didi-shop-db");

  if (req.method === "POST") {
    const { id, userId } = req.body;

    const productExists = await db
      .collection("recentlyViewedProducts")
      .findOne({ _id: userId, recentlyViewedProducts: id });

    if (!productExists) {
      recentlyViewedProducts.push(id);

      try {
        await db
          .collection("recentlyViewedProducts")
          .insertOne({ _id: userId, recentlyViewedProducts: [id] });
      } catch (error) {
        await db
          .collection("recentlyViewedProducts")
          .updateOne(
            { _id: userId },
            { $push: { recentlyViewedProducts: id } }
          );
      }
    }

    res.status(200).json({ recentlyViewedProducts });
  } else if (req.method === "GET") {
    const { query } = req;
    const { userId } = query;

    const findUser = await db
      .collection("recentlyViewedProducts")
      .findOne({ _id: userId });

    res
      .status(200)
      .json({ recentlyViewedProducts: findUser?.recentlyViewedProducts });
  } else if (req.method === "DELETE") {
    const { userId } = req.body;

    await db
      .collection("recentlyViewedProducts")
      .updateOne({ _id: userId }, { $set: { recentlyViewedProducts: [] } });

    res.status(200).json({});
  } else {
    res.status(405).end();
  }
}
