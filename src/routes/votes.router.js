import { Router } from "express";
import { newVote, showResult } from "../controllers/votes.controller.schema.js";

const votesRouter = Router();

votesRouter.post("/choice/:id/vote", newVote);
votesRouter.get("/poll/:id/result", showResult);

export default votesRouter;
