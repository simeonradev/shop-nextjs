import { ObjectId } from "mongodb";
import clientPromise from "../../mongodb";

let users = [];

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("didi-shop-db");

  if (req.method === "POST") {
    const { user } = req.body;
    users.push(user);
    const userExists = await db
      .collection("users")
      .findOne({ username: user.username });
    if (userExists) {
      res.status(409).json();
    } else {
      await db
        .collection("users")
        .insertOne({
          username: user.username,
          password: user.password,
          name: user.name,
          age: user.age,
          describtion: user.describtion,
        });
      const newUser = await db
        .collection("users")
        .findOne({ username: user.username });
      res.status(201).json({ user: newUser });
    }
  } else if (req.method === "GET") {
    const { query } = req;
    const { username, password } = query;
    const user = await db
      .collection("users")
      .findOne({ username: username, password: password });
    if (user) {
      res.status(200).json({ user: user });
    } else {
      res.status(404).json();
    }
  } else if (req.method === "DELETE") {
    const { user } = req.body;
    const userExists = await db
      .collection("users")
      .findOne({ username: user.username });

    if (userExists) {
      await db.collection("users").deleteOne({ _id: ObjectId(`${user._id}`) });
      console.log("user deleted");
      res.status(200).json();
    } else {
      console.log("user not deleted");

      res.status(404).json();
    }
  } else if (req.method === "PUT") {
    const user = req.body;

    const userExists = await db
      .collection("users")
      .findOne({ username: user.username });
    if (userExists) {
      await db.collection("users").updateOne(
        { username: user.username },
        {
          $set: {
            name: user.name,
            age: user.age,
            describtion: user.describtion,
          },
        }
      );
      res.status(200).json();
    } else {
      res.status(400).json();
    }
  } else {
    res.status(405).end();
  }
}
