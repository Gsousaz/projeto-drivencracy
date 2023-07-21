import { Router } from "express";
import pollsRouter from "./polls.router.js";
import choicesRouter from "./choices.router.js";
import votesRouter from "./votes.router.js";

const router = Router();
router.use(pollsRouter);
router.use(choicesRouter);
router.use(votesRouter);

export default router;
