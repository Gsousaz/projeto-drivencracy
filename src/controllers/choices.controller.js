import dayjs from "dayjs";
import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";
export async function newPollOption(req, res) {
  try {
    const { title, pollId } = req.body;
    const objectId = new ObjectId(pollId);

    const pollExists = await db.collection("polls").findOne({ _id: objectId });
    if (!pollExists) return res.sendStatus(404);

    const titleExists = await db
      .collection("choices")
      .findOne({ title: title });
    if (titleExists) return res.sendStatus(409);

    const limitDate = dayjs(pollExists.expireAt);
    const today = dayjs();

    if (today.isAfter(limitDate)) {
      return res.status(403).send("Enquete encerrada!");
    }

    const insertResult = await db
      .collection("choices")
      .insertOne({ title: title, pollId: pollId });
    const insertedPoll = await db
      .collection("choices")
      .findOne({ _id: insertResult.insertedId });

    res.status(201).send(insertedPoll);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function showPollOptions(req, res) {
  try {
    const id = req.params.id;

    const objectId = new ObjectId(id);
    console.log("ID:", id);
    console.log("ObjectId:", objectId);

    const pollExists = await db.collection("polls").findOne({ _id: objectId });
    if (!pollExists) {
      return res.sendStatus(404);
    }

    const pollOptions = await db
      .collection("choices")
      .find({ pollId: id })
      .toArray();


    return res.status(200).send(pollOptions)
  } catch (err) {
    console.error("Erro:", err);
    return res.status(500).send(err.message);
  }
}
