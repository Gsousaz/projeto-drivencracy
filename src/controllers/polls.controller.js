import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function newPoll(req, res) {
  try {
    const dataAtualMais30Dias = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm');

    let { title, expireAt } = req.body;

    if (!expireAt || expireAt.length === 0) {
      expireAt = dataAtualMais30Dias;
    }

    const poll = { title, expireAt };
    const insertResult = await db.collection("polls").insertOne(poll);

    const insertedPoll = await db
      .collection("polls")
      .findOne({ _id: insertResult.insertedId });

    res.status(201).send(insertedPoll);
  } catch (err) {
    res.status(500).send(err.message);
  }
}


export async function showPolls(req, res) {
  try {
    const polls = await db.collection("polls").find().toArray();
    res.status(200).send(polls);
  } catch (err) {
    (err) => res.status(500).send(err.message);
  }
}
