import { Router } from "express";
import pollsRouter from "./polls.router.js";
import choicesRouter from "./choices.router.js";

const router = Router();
router.use(pollsRouter);
router.use(choicesRouter);

export default router;
