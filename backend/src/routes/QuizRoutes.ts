import express from "express";
const routes = express();

import { mongoIDValidator, courseValidator } from "../middleware/validation.ts";
import QuizController from "../controller/QuizController.ts";
// const { productValidator } = require("../middleware/validation");
// const upload = require("../config/files");
// const createValidation = require("../middleware/validation");
import { isAuthenticated, isInstructor } from "../middleware/auth.ts";

// const { isAuthorized } = require("../middleware/authValidationJWT");

// requirement
// gets all data
routes.get("/getall", QuizController.getAll);

// get one data
routes.get("/:id", mongoIDValidator, QuizController.getOne);

// deletes
routes.delete(
    "/toggle-delete/:id",
    // isAuthorized,
    mongoIDValidator,
    QuizController.delete
);

// add
routes.post(
    "/add",
    //   upload.single("file_to_upload"),
    //   isAuthorized,
    //   productValidator.create,
    // courseValidator.create,
    isAuthenticated,
    isInstructor,
    QuizController.add
);

// add quiz to chapter
routes.post(
    "/add-to-chapter",
    //   upload.single("file_to_upload"),
    //   isAuthorized,
    //   productValidator.create,
    courseValidator.create,
    QuizController.addToChapter
);

// add quiz to sub chapter
routes.post(
    "/add-to-sub-chapter",
    //   upload.single("file_to_upload"),
    //   isAuthorized,
    //   productValidator.create,
    courseValidator.create,
    QuizController.addToSubChapter
);

// partial update
routes.patch(
    "/update/:id",
    // isAuthorized,
    // productValidator.update,
    QuizController.update
);

export default routes;
