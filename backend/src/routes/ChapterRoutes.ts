import express from "express";
const routes = express();

import ChapterController from "../controller/ChapterController.ts";

import { mongoIDValidator, courseValidator } from "../middleware/validation.ts";
import { isAuthenticated, isInstructor } from "../middleware/auth.ts";

// const upload = require("../config/files");

// const { isAuthorized } = require("../middleware/authValidationJWT");

// requirement
// gets all data
routes.get("/getall", ChapterController.getAll);

// get one data
routes.get("/:id", mongoIDValidator, ChapterController.getOne);

// deletes
routes.delete(
    "/delete/:id",
    // isAuthorized,
    mongoIDValidator,
    ChapterController.delete
);

// add
routes.post(
    "/add",
    //   upload.single("file_to_upload"),
    isAuthenticated,
    isInstructor,
    // courseValidator.create,
    ChapterController.add
);

// partial update
routes.patch(
    "/update/:id",
    // isAuthorized,
    // productValidator.update,
    ChapterController.update
);

// update
// routes.put('/:id', createValidation, ProductController.update)

export default routes;
