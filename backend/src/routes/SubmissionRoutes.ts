import express from "express";
const routes = express();
import SubmissionController from "../controller/SubmissionController.ts";
import { isAuthenticated, isLearner } from "../middleware/auth.ts";

routes.post("/create", isAuthenticated, isLearner, SubmissionController.add);
routes.patch("/answer/:quizId/:questionId", isAuthenticated, isLearner, SubmissionController.addAnswer);
routes.post("/submit", isAuthenticated, isLearner, SubmissionController.submit);

export default routes;
