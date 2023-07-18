import { Router } from "express";
import pollsRouter from "./polls.router.js";

const router = Router();
router.use(pollsRouter)

export default router;
