import express from "express";
import { crawlController } from "../controllers/crawl.controller.js";

const router = express.Router();
router.post("/crawl", crawlController);

export default router;