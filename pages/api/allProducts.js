import clientPromise from "../../mongodb";

let products = [];
export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("didi-shop-db");

  if (req.method === "POST") {
    const productDetails = req.body;
    const productExists = await db
      .collection("allProducts")
      .findOne({ _id: "All Products", "products.id": productDetails.id });

    if (productExists) {
      await db.collection("allProducts").updateOne(
        { _id: "All Products", "products.id": productDetails.id },
        {
          $set: {
            "products.$.name": productDetails.name,
            "products.$.category": productDetails.category,
            "products.$.location": productDetails.location,
            "products.$.inStock": productDetails.inStock,
            "products.$.rating": productDetails.rating,
            "products.$.price": productDetails.price,
          },
        }
      );

      res.status(200).json(products);
    } else {
      await db
        .collection("allProducts")
        .updateOne(
          { _id: "All Products" },
          { $push: { products: productDetails } }
        );

      res.status(200).json(products);
    }
  } else if (req.method === "GET") {
    const findProducts = await db
      .collection("allProducts")
      .findOne({ _id: "All Products" });

    res.status(200).json({ products: findProducts });
  } else if (req.method === "DELETE") {
    const id = req.body;

    await db
      .collection("allProducts")
      .updateOne({ _id: "All Products" }, { $pull: { products: { id: id } } });
    res.status(200).json({});
  } else {
    res.status(405).end();
  }
}
