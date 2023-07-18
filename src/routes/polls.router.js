import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { newPoll } from "../controllers/polls.controller.js";
import { schemaPoll } from "../schemas/pollSchema.js";

const pollsRouter = Router();

pollsRouter.post("/poll", validateSchema(schemaPoll), newPoll);

export default pollsRouter