import { db } from "../database/database.connection.js";

export async function newPoll(req, res) {
  try {
    const { title, expireAt } = req.body;
    const poll = { title, expireAt };
    const insertResult = await db.collection("polls").insertOne(poll);

    const insertedPoll = await db
      .collection("polls")
      .findOne({ _id: insertResult.insertedId });

    res.status(201).send(insertedPoll);
    console.log(insertedPoll);
  } catch (err) {
    (err) => res.status(500).send(err.message);
  }
}

export async function showPolls(req, res) {
  try {
    const polls = await db.collection("polls").find().toArray();
    console.log(polls);
    res.status(200).send(polls);
  } catch (err) {
    (err) => res.status(500).send(err.message);
  }
}
