import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";

export async function newVote(req, res) {
  try {
    const { title, pollId } = req.body;
    const objectId = new ObjectId(pollId);

    const pollExists = await db.collection("polls").findOne({ _id: objectId });
    if (!pollExists) return res.sendStatus(404);

    const titleExists = await db
      .collection("choices")
      .findOne({ title: title });
    if (titleExists) return res.sendStatus(409);

    const insertResult = await db
      .collection("choices")
      .insertOne({ title: title, pollId: pollId });
    const insertedPoll = await db
      .collection("choices")
      .findOne({ _id: insertResult.insertedId });

    res.status(201).send(insertedPoll);
    console.log(insertedPoll);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function showPollOptions(req, res) {
  try {
    const id = req.params.id;

    // Validação do ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).send("ID inválido");
    }

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

    console.log("pollOptions:", pollOptions);
    return res.sendStatus(200);
  } catch (err) {
    console.error("Erro:", err);
    return res.status(500).send(err.message);
  }
}
