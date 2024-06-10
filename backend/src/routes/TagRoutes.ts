import express from "express";
const routes = express();
import CategoryController from "../controller/CategoryController.ts";
import { isAuthenticated, isInstructor, isLearner } from "../middleware/auth.ts";

routes.post("/create", isAuthenticated, isInstructor, CategoryController.getAll);
// routes.patch("/answer/:quizId/:questionId", isAuthenticated, isLearner, CategoryController.addAnswer);

export default routes;
