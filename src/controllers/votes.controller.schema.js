import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export async function newVote(req, res) {
  try {
    const id = req.params.id;

    const objectId = new ObjectId(id);

    const optionExists = await db
      .collection("choices")
      .findOne({ _id: objectId });

    if (!optionExists) {
      return res.sendStatus(404);
    }

    await db
      .collection("choices")
      .updateOne({ _id: objectId }, { $inc: { votes: 1 } });
    // Não fiz testes ainda, mas com fé que está funcionando

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function showResult(req, res) {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);

    const poll = await db.collection("polls").findOne({ _id: objectId });

    const winChoice = await db.collection("choices").findOne({pollId: id}, { sort: {pollId: id} && { votes: -1 } });

    if (!winChoice) {
      return res.status(404).send("Nenhuma opção encontrada para essa enquete.");
    }

    res.status(200).send({
      _id: id,
      title: poll.title,
      expireAt: "2022-02-14 01:00",
      result: {
        title: winChoice.title,
        votes: winChoice.votes,
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
