import express from "express";
const routes = express();

import { mongoIDValidator, courseValidator } from "../middleware/validation.ts";
import QuizController from "../controller/QuizController.ts";
import AssignmentController from "../controller/AssignmentController.ts";
// const { productValidator } = require("../middleware/validation");
// const upload = require("../config/files");
// const createValidation = require("../middleware/validation");

// const { isAuthorized } = require("../middleware/authValidationJWT");

// requirement
// gets all data
routes.get("/getall", AssignmentController.getAll);

// get one data
routes.get("/:id", mongoIDValidator, AssignmentController.getOne);

// deletes
routes.delete(
    "/toggle-delete/:id",
    // isAuthorized,
    mongoIDValidator,
    AssignmentController.delete
);

// add
routes.post(
    "/add",
    //   upload.single("file_to_upload"),
    //   isAuthorized,
    //   productValidator.create,
    courseValidator.create,
    QuizController.add
);

// add assignment to chapter
routes.post(
    "/add-to-chapter",
    //   upload.single("file_to_upload"),
    //   isAuthorized,
    //   productValidator.create,
    courseValidator.create,
    AssignmentController.addToChapter
);

// add quiz to sub chapter
routes.post(
    "/add-to-sub-chapter",
    //   upload.single("file_to_upload"),
    //   isAuthorized,
    //   productValidator.create,
    courseValidator.create,
    AssignmentController.addToSubChapter
);

// partial update
routes.patch(
    "/update/:id",
    // isAuthorized,
    // productValidator.update,
    AssignmentController.update
);

export default routes;
