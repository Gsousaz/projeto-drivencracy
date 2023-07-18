import { Router } from "express";
import { newVote } from "../controllers/choices.controller.js";

const choicesRouter = Router();

choicesRouter.post("/choice", newVote);

export default choicesRouter;
