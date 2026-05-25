import { Router } from "express";

import { getLogs, createLog } from "./logs.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import apiKeyMiddleware from "../middlewares/apiKey.middleware.js";

const router = Router();

router.get("/:name/logs", authMiddleware, getLogs);

router.post("/:name/logs", apiKeyMiddleware, createLog);

export default router;