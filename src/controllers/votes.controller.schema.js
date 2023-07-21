import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

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

    const getExpirationDate = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(optionExists.pollId) });

    const limitDate = dayjs(getExpirationDate.expireAt);
    const today = dayjs();
    if (today.isAfter(limitDate)) {
      return res.status(403).send("Enquete encerrada!");
    }

    const vote = {
      date: Date.now(),
      optionId: objectId,
    };

    await db.collection("votes").insertOne(vote); // Salva o voto no banco para registro

    await db
      .collection("choices")
      .updateOne({ _id: objectId }, { $inc: { votes: 1 } }); // Incrementa o contador de votos da opção

    res.status(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function showResult(req, res) {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);

    const poll = await db.collection("polls").findOne({ _id: objectId });

    const winChoice = await db
      .collection("choices")
      .findOne({ pollId: id }, { sort: { pollId: id } && { votes: -1 } });

    if (!winChoice) {
      return res
        .status(404)
        .send("Nenhuma opção encontrada para essa enquete.");
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
