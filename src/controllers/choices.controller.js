import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";

export async function newVote(req, res) {
  try {
    const { title, pollId } = req.body;
    const objectId = new ObjectId(pollId);

    const pollExists = await db.collection("polls").findOne({ _id: objectId });
    if (!pollExists) return res.sendStatus(404);

    const titleExists = await db.collection("polls").findOne({ title: title });
    if (titleExists) return res.sendStatus(409);

    const insertResult = await db
      .collection("choices")
      .insertOne({ title: title, pollId: pollId });
    const insertedPoll = await db
      .collection("choices")
      .findOne({ _id: insertResult.insertedId });

    res.status(201).send(insertedPoll);
    console.log(insertedPoll)
  } catch (err) {
    res.status(500).send(err.message);
  }
}
