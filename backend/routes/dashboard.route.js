import express from "express";
import { getDashboardStats } from "../controller/dashboard.controller.js";
import adminAuth from "../middleware/adminAuth.js";

const dashboardRouter = express.Router();
dashboardRouter.get("/stats", adminAuth, getDashboardStats);

export default dashboardRouter;
