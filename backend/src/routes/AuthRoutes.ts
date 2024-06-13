import express from "express";
const routes = express();
import AuthController from "../controller/AuthController.ts";
import { AuthValidator } from "../middleware/validation.ts";
import { generateRefreshToken } from "../middleware/auth.ts";

// routes.get("/all", UserController.getAll);
// routes.get("/detail/:id", UserController.getOneById);
// routes.post("/create", userValidator.create, UserController.create);

// routes.post("/login", AuthValidator.login, AuthController.login);
// routes.post("/sign-up", AuthValidator.signup, AuthController.signup);

routes.post("/login/learner", AuthValidator.login, AuthController.loginLearner);
routes.post("/sign-up/learner", AuthValidator.signup, AuthController.signupLearner);

routes.post("/login/instructor", AuthValidator.login, AuthController.loginInstructor);
routes.post("/sign-up/instructor", AuthValidator.signup, AuthController.signupInstructor);

routes.post("/login/admin", AuthValidator.login, AuthController.loginAdmin);
routes.post("/sign-up/admin", AuthValidator.signup, AuthController.signupAdmin);

routes.post("/whoami", generateRefreshToken, AuthController.refresh);

routes.get("/all-users", AuthController.getAllUsers);
routes.get("/all-learners", AuthController.getAllLearners);
routes.get("/all-instructors", AuthController.getAllInstructors);
routes.get("/detail/:id", AuthController.getOneById);

export default routes;
