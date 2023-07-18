import { Router } from "express";
import { newVote } from "../controllers/choices.controller.js";
import { schemaChoice } from "../schemas/choiceSchema.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

const choicesRouter = Router();

choicesRouter.post("/choice", validateSchema(schemaChoice), newVote);

export default choicesRouter;
