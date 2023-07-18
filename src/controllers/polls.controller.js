import { db } from "../database/database.connection.js";

export async function newPoll(req, res) {
  try {
    const { title, expireAt } = req.body;
    const poll = { title, expireAt };
    const insertResult = await db.collection("polls").insertOne(poll);
    
    const insertedPoll = await db.collection("polls").findOne({ _id: insertResult.insertedId });

    res.status(201).send(insertedPoll);
    console.log(insertedPoll);
  } catch (err) {
    res.status(500).send(err);
  }
}
