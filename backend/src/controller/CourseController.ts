import { Request, Response } from "express";
import mongoose from "mongoose";
import HTTP_STATUS from "../constants/statusCodes.ts";
import { validationResult, ValidationError, FieldValidationError, AlternativeValidationError } from "express-validator";
import sendResponse, { checkValidation, removeFile } from "../util/common.ts";
import CourseModel from "../model/CourseModel.ts";
import CourseService, { IGetAllProps } from "../service/Course/index.ts";
import CourseRepository from "../repository/Course/index.ts";
import fs from "fs";
import path from "path";
import ChapterModel from "../model/ChapterModel.ts";
import AdminModel from "../model/AdminModel.ts";
import NotificationModel from "../model/NotificationModel.ts";

class Course {
    async getAll(req: Request, res: Response) {
        try {
            const { title, category, sortParam, sortOrder, search, page, limit } = req.query;

            const filter: IGetAllProps = {
                page: Number(page) ?? 1,
                limit: Number(limit) ?? 8,
            };

            if (search !== "") {
                filter.search = search as string;
            }

            const { courses, courseCount } = await CourseService.getAll(filter);

            if (courses.length > 0) {
                console.log("ip", req.socket.remoteAddress);
                return sendResponse(res, HTTP_STATUS.OK, "Successfully got all the courses", {
                    total: courseCount,
                    count: courses.length,
                    page: Number(page),
                    limit: Number(limit),
                    courses: courses,
                });
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No Courses found", {
                total: courseCount,
                count: 0,
                page: page,
                limit: limit,
                courses: [],
            });
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }

    // gets only one product
    async getOne(req: Request, res: Response) {
        try {
            const validation: ValidationError[] = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to get the course", validation[0].msg);
            }

            const { id } = req.params;

            const course = await CourseRepository.getOne(new mongoose.Types.ObjectId(id));
            if (course.length) {
                // return res.status(HTTP_STATUS.OK).send(course[0]);
                return sendResponse(res, HTTP_STATUS.OK, "Successfully got the course", course);
            } else {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Course with this ID doesnt exist");
            }
        } catch (error) {
            console.log("error", error);
            return sendResponse(res, HTTP_STATUS.BAD_REQUEST, "Internal Server Error");
        }
    }

    // adds
    async add(req: Request, res: Response) {
        try {
            const { title, category, description, releaseDate, instructors } = req.body;
            console.log(req.file);
            // console.log(req.file.filename);
            const validation = checkValidation(req);
            if (validation.length > 0) {
                req.file && removeFile([req.file.filename]);
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to add the course", validation);
            }

            if (
                req.file &&
                ![".jpeg", ".jpg", ".png"].includes(
                    path.extname(path.join(path.resolve(path.dirname("")), "server", req.file.filename))
                )
            ) {
                req.file && removeFile([req.file.filename]);
                return sendResponse(
                    res,
                    HTTP_STATUS.UNPROCESSABLE_ENTITY,
                    "Only jpeg, jpg and png files are allowed",
                    validation
                );
            }

            const existingCourse = await CourseModel.findOne({
                title: { $regex: title, $options: "i" },
            });

            if (existingCourse) {
                req.file && removeFile([req.file.filename]);
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Course with same title already exists");
            }

            // if (!instructors) {
            //     req.file && removeFile([req.file.filename]);
            //     return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Instructor must be provided");
            // }

            if (req.file) {
                fs.mkdirSync(path.join(path.resolve(path.dirname("")), "server", title, "banner"), { recursive: true });
                fs.rename(
                    path.join(path.resolve(path.dirname("")), "server", req.file.filename),
                    path.join(path.resolve(path.dirname("")), "server", title, "banner", req.file.filename),
                    (err) => {
                        console.log(err);
                    }
                );
            }

            const totalInstructors =
                instructors && instructors.length > 0 ? [req.body.userId, ...instructors] : [req.body.userId];
            console.log([...new Set(totalInstructors)]);

            console.log(Array(instructors));
            const course = await CourseRepository.add(
                title,
                category,
                description,
                releaseDate,
                [...new Set(totalInstructors)],
                req.file && path.join("/", title, "banner", req.file.filename)
            );

            const admins = await AdminModel.find({});

            const notificationsData = admins.map((element) => {
                return {
                    user: {
                        userId: element._id,
                        role: "admin",
                    },
                    message: "A new course as been added and is waiting for approval",
                    isRead: false,
                };
            });

            const notifications = await NotificationModel.create(notificationsData);
            if (course && notifications) {
                return sendResponse(res, HTTP_STATUS.CREATED, "Course Added Successfully", course);
            }
            return sendResponse(res, HTTP_STATUS.CREATED, "Course could not be added");
        } catch (error) {
            console.log("error", error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }

    // deletes a product
    async delete(req: Request, res: Response) {
        try {
            const validation = validationResult(req).array();
            // console.log(validation);
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to remove the course", validation[0].msg);
            }
            const itemId = req.params.id;
            // Find the item by ID and delete it
            const deletedItem = await CourseModel.findByIdAndDelete(itemId);
            console.log("deleted course", deletedItem);

            if (!deletedItem) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "course not found");
            }

            return sendResponse(res, HTTP_STATUS.ACCEPTED, "course deleted successfully", deletedItem);
        } catch (error) {
            console.error(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }

    // updates
    async update(req: Request, res: Response) {
        try {
            const courseId = req.params.id;
            console.log(req.file);
            // console.log(req.file.filename);
            const validation = checkValidation(req);
            if (validation.length > 0) {
                // req.file && removeFile([req.file.filename]);
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to add the course", validation);
            }
            // const updatedCourse = await CourseRepository.update(
            //     new mongoose.Types.ObjectId(courseId),
            //     updatedCourseData
            // );

            const updatedCourseData = req.body;

            if (
                !updatedCourseData.title &&
                !updatedCourseData.category &&
                !updatedCourseData.chapters &&
                !updatedCourseData.students &&
                !updatedCourseData.instructors &&
                !updatedCourseData.tags &&
                !updatedCourseData.description &&
                !updatedCourseData.releaseDate
            ) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No data was updated");
            }

            if (updatedCourseData.chapters) {
                const chaptersCount = await ChapterModel.find({ _id: updatedCourseData.chapters }).count();
                if (chaptersCount !== updatedCourseData.chapters.length) {
                    return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Chapter IDs provided were not valid");
                }
            }

            const updatedCourse = await CourseModel.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(courseId) },
                updatedCourseData,
                { new: true }
            );
            //     new mongoose.Types.ObjectId(courseId),
            //     updatedCourseData

            // console.log(updatedCourse);

            console.log("updatedCourse", updatedCourse);
            if (!updatedCourse) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to update. course not found");
            }

            return sendResponse(res, HTTP_STATUS.ACCEPTED, "course updated successfully", updatedCourse);
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }
}

export default new Course();
