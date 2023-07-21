import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export async function newVote(req, res) {
  try {
    const id = req.params.id;

    const objectId = new ObjectId(id);

    const optionExists = await db.collection("choices").findOne({ _id: objectId });

    if (!optionExists) {
      return res.sendStatus(404);
    }

    await db.collection("choices").updateOne({ _id: objectId }, { $inc: { votes: 1 } });
    
    res.sendStatus(201);

  } catch (err) {
    res.status(500).send(err.message);
  }
}
