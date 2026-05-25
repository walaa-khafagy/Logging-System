import { Router } from "express";

import {getApplications, getApplicationByName, createApplication, deleteApplication} from "./applications.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);


router.get("/", getApplications);

router.get("/:name", getApplicationByName);

router.post("/", createApplication);

router.delete("/:name", deleteApplication);

export default router;