import express from "express";
const routes = express();

import CourseController from "../controller/CourseController.ts";

import { mongoIDValidator, courseValidator } from "../middleware/validation.ts";
import { isAuthenticated, isInstructor } from "../middleware/auth.ts";
import upload from "../config/files.ts";
// gets all data
routes.get("/getall", CourseController.getAll);

// get one data
routes.get("/:id", mongoIDValidator, CourseController.getOne);

// deletes
routes.delete(
    "/:id",
    // isAuthorized,
    mongoIDValidator,
    CourseController.delete
);

// add
routes.post(
    "/add",
    upload.single("file_to_upload"),
    isAuthenticated,
    isInstructor,
    courseValidator.create,
    CourseController.add
);

// partial update
routes.patch("/update/:id", isAuthenticated, isInstructor, courseValidator.update, CourseController.update);

export default routes;
