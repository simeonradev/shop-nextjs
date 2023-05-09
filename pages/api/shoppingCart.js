import clientPromise from "../../mongodb";

let shoppingCart = [];

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("didi-shop-db");

  if (req.method === "GET") {
    const { query } = req;
    const { userId } = query;

    const findUser = await db
      .collection("shoppingCart")
      .findOne({ _id: userId });

    res.status(200).json({ shoppingCart: findUser?.shoppingCart });
  } else if (req.method === "POST") {
    const { userId, id, name, price } = req.body;

    const productExists = await db
      .collection("shoppingCart")
      .findOne({ _id: userId });

    if (!productExists) {
      try {
        await db.collection("shoppingCart").insertOne({
          _id: userId,
          shoppingCart: [{ name, id, price, amount: 1 }],
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await db
          .collection("shoppingCart")
          .updateOne(
            { _id: userId },
            { $push: { shoppingCart: { name, id, price, amount: 1 } } }
          );
      } catch (error) {
        console.log(error);
      }
    }

    res.status(200).json({ shoppingCart });
  } else if (req.method === "PUT") {
    const { userId, id } = req.body;
    const productExists = await db
      .collection("shoppingCart")
      .findOne({ _id: userId, "shoppingCart.id": id });

    if (productExists) {
      try {
        await db
          .collection("shoppingCart")
          .updateOne(
            { _id: userId, "shoppingCart.id": id },
            { $inc: { "shoppingCart.$.amount": 1 } }
          );
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("product does not exist");
    }

    res.status(200).json({ shoppingCart });
  } else if (req.method === "DELETE") {
    const { userId, id } = req.body;

    const product = await db
      .collection("shoppingCart")
      .findOne({ _id: userId, "shoppingCart.id": id });

    if (product) {
      const item = product.shoppingCart.find((item) => item.id === id);

      if (item.amount > 1) {
        await db
          .collection("shoppingCart")
          .updateOne(
            { _id: userId, "shoppingCart.id": id },
            { $inc: { "shoppingCart.$.amount": -1 } }
          );
      } else {
        await db
          .collection("shoppingCart")
          .updateOne({ _id: userId }, { $pull: { shoppingCart: { id } } });
      }
    }
    res.status(200).json({});
  } else {
    res.status(405).end();
  }
}
