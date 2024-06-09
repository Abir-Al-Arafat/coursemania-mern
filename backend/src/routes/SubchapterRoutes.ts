import express from "express";
const routes = express();
import SubchapterController from "../controller/SubchapterController.ts";
import { mongoIDValidator, courseValidator } from "../middleware/validation.ts";
import upload from "../config/files.ts";
import { isAuthenticated, isInstructor } from "../middleware/auth.ts";

// gets all data
routes.get("/getall", SubchapterController.getAll);

// get one data
routes.get("/:id", mongoIDValidator, SubchapterController.getOne);

// deletes
routes.delete(
    "/delete/:id",
    // isAuthorized,
    mongoIDValidator,
    SubchapterController.delete
);

// add
routes.post(
    "/add",
    upload.array("files"),
    // upload.single("pdf"),
    // isAuthorized,
    isAuthenticated,
    isInstructor,
    // courseValidator.create,
    SubchapterController.add
);

// partial update
routes.patch(
    "/update/:id",
    // isAuthorized,
    // productValidator.update,
    SubchapterController.update
);

export default routes;
