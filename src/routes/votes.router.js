import { Router } from "express";
import { newVote } from "../controllers/votes.controller.schema.js";

const votesRouter = Router();

votesRouter.post("/choice/:id/vote", newVote)

export default votesRouter;