import { Router } from "express";
import { newPollOption, showPollOptions } from "../controllers/choices.controller.js";
import { schemaChoice } from "../schemas/choiceSchema.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

const choicesRouter = Router();

choicesRouter.post("/choice", validateSchema(schemaChoice), newPollOption);
choicesRouter.get("/poll/:id/choice", showPollOptions)

export default choicesRouter;
