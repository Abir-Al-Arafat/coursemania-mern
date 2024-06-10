import express, { Request, Response } from "express";
import HTTP_STATUS from "../constants/statusCodes.ts";
import { validationResult, ValidationError } from "express-validator";
import sendResponse from "../util/common.ts";
// import CourseRepository from "../repository/Course/index.ts";
import ChapterRepository from "../repository/Chapter/index.ts";
import QuizRepository from "../repository/Quiz/index.ts";
import AssignmentRepository from "../repository/Assignment/index.ts";
import mongoose from "mongoose";

class Assignment {
    async getAll(req: Request, res: Response) {
        try {
            // const {
            //   sortParam,
            //   sortOrder,
            //   search,
            //   name,
            //   author,
            //   price,
            //   priceFil,
            //   stock,
            //   stockFil,
            //   page,
            //   limit,
            // } = req.query;
            // if (page < 1 || limit < 0) {
            //   return res
            //     .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
            //     .send(failure("Page and limit values must be at least 1"));
            // }
            // if (
            //   (sortOrder && !sortParam) ||
            //   (!sortOrder && sortParam) ||
            //   (sortParam &&
            //     sortParam !== "stock" &&
            //     sortParam !== "price" &&
            //     sortParam !== "name") ||
            //   (sortOrder && sortOrder !== "asc" && sortOrder !== "desc")
            // ) {
            //   return res
            //     .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
            //     .send(failure("Invalid sort parameters provided"));
            // }
            // const filter = {};

            // if (price && priceFil) {
            //   if (priceFil === "low") {
            //     filter.price = { $lte: parseFloat(price) };
            //   } else {
            //     filter.price = { $gte: parseFloat(price) };
            //   }
            // }
            // if (stock && stockFil) {
            //   if (stockFil === "low") {
            //     filter.stock = { $lte: parseFloat(stock) };
            //   } else {
            //     filter.stock = { $gte: parseFloat(stock) };
            //   }
            // }

            // if (name) {
            //   filter.name = { $regex: name, $options: "i" };
            // }
            // if (author) {
            //   filter.author = { $in: author.toLowerCase() };
            // }
            // if (search) {
            //   filter["$or"] = [
            //     { name: { $regex: search, $options: "i" } },
            //     { author: { $regex: search, $options: "i" } },
            //   ];
            // }
            // console.log(filter.$or);
            // console.log(typeof Object.keys(JSON.parse(JSON.stringify(filter)))[0]);
            // const productCount = await ProductModel.find({}).count();
            // const products = await ProductModel.find(filter)
            //   .sort({
            //     [sortParam]: sortOrder === "asc" ? 1 : -1,
            //   })
            //   .skip((page - 1) * limit)
            //   .limit(limit ? limit : 10);
            // // console.log(products)
            // if (products.length === 0) {
            //   return res.status(HTTP_STATUS.OK).send(
            //     success("No products were found", {
            //       total: productCount,
            //       totalPages: null,
            //       count: 0,
            //       page: 0,
            //       limit: 0,
            //       products: [],
            //     })
            //   );
            // }

            const { assignment, assignmentCount } = await AssignmentRepository.getAll();

            // console.log(courses);
            if (assignment) {
                return sendResponse(res, HTTP_STATUS.OK, "Successfully got all the quizzes", {
                    total: assignmentCount,
                    // count: products.length,
                    // page: parseInt(page),
                    // limit: parseInt(limit),
                    assignment: assignment,
                });
            } else {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No quizzes found");
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    // gets only one assignment
    async getOne(req: Request, res: Response) {
        try {
            const validation: ValidationError[] = validationResult(req).array();
            // console.log(validation);
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to get the assignment", validation[0].msg);
            }

            const { id } = req.params;

            const assignment = await AssignmentRepository.getOne(new mongoose.Types.ObjectId(id));

            if (assignment.length) {
                return sendResponse(res, HTTP_STATUS.OK, "Successfully got the assignment", assignment);
            } else {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "assignment with this ID doesnt exist");
            }
        } catch (error) {
            console.log("error", error);
            return sendResponse(res, HTTP_STATUS.BAD_REQUEST, "internal server error");
        }
    }

    // adds assignment to chapter
    async addToChapter(req: Request, res: Response) {
        try {
            //   const validation = validationResult(req).array();
            //   // console.log(validation);
            //   if (validation.length > 0) {
            //     return sendResponse(
            //       res,
            //       HTTP_STATUS.NOT_FOUND,
            //       "Failed to add the quiz",
            //       validation[0].msg
            //     );
            //   }
            const { title, description, dueDate, maxPoints, createdBy, chapterId } = req.body;

            console.log("Req Body", req.body);
            // const img = req.file.filename;
            // console.log("img", img);

            const addedAssignment = await AssignmentRepository.addToChapter(
                title,
                description,
                dueDate,
                maxPoints,
                createdBy,
                new mongoose.Types.ObjectId(chapterId)
            );

            if (!addedAssignment) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to add the assignment to the chapter");
            }
            // await chapter.save();

            return sendResponse(
                res,
                HTTP_STATUS.CREATED,
                "Assignment Added Successfully to the chapter",
                addedAssignment
            );
        } catch (error) {
            console.log("error", error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal server error");
        }
    }

    async addToSubChapter(req: Request, res: Response) {
        try {
            //   const validation = validationResult(req).array();
            //   // console.log(validation);
            //   if (validation.length > 0) {
            //     return sendResponse(
            //       res,
            //       HTTP_STATUS.NOT_FOUND,
            //       "Failed to add the quiz",
            //       validation[0].msg
            //     );
            //   }
            const { title, description, dueDate, maxPoints, createdBy, chapterId, subChapterId } = req.body;

            console.log("Req Body", req.body);
            // const img = req.file.filename;
            // console.log("img", img);

            const assignment = await AssignmentRepository.addToSubChapter(
                title,
                description,
                dueDate,
                maxPoints,
                createdBy,
                new mongoose.Types.ObjectId(chapterId),
                new mongoose.Types.ObjectId(subChapterId)
            );

            if (!assignment) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to add the assignment to sub the chapter");
            }
            // await chapter.save();

            return sendResponse(res, HTTP_STATUS.CREATED, "Assignment Added Successfully to a sub chapter", assignment);
        } catch (error) {
            console.log("error", error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal server error");
        }
    }

    // deletes a quiz
    async delete(req: Request, res: Response) {
        try {
            const validation = validationResult(req).array();
            // console.log(validation);
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to remove the assignment", validation[0].msg);
            }
            const assignmentId = req.params.id;
            // Find the item by ID and delete it
            const deletedAssignment = await AssignmentRepository.delete(new mongoose.Types.ObjectId(assignmentId));
            console.log("deletedAssignment", deletedAssignment);

            if (!deletedAssignment) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Assignment not found");
            }

            return sendResponse(res, HTTP_STATUS.ACCEPTED, "Assignment deleted successfully", deletedAssignment);
        } catch (error) {
            console.error(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    // updates
    async update(req: Request, res: Response) {
        try {
            const assignmentId = req.params.id;
            const updatedAssignmentData = req.body;

            // const validation = validationResult(req).array();

            // if (validation.length > 0) {
            //     return res
            //         .status(HTTP_STATUS.OK)
            //         .send(failure("Failed to update data", validation[0].msg));
            // }

            // const updatedProduct = await ProductModel.findByIdAndUpdate(
            //   productId,
            //   updatedProductData,
            //   // Returns the updated document
            //   { new: true }
            // );

            const updatedAssignment = await AssignmentRepository.update(
                new mongoose.Types.ObjectId(assignmentId),
                updatedAssignmentData
            );

            if (!updatedAssignment) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Assignment couldnt be updated", updatedAssignment);
            }
            console.log("updatedAssignment", updatedAssignment);

            return sendResponse(res, HTTP_STATUS.ACCEPTED, "Assignment updated successfully", updatedAssignment);
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "INTERNAL SERVER ERROR" });
        }
    }
}

export default new Assignment();
