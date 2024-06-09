import express, { Request, Response } from "express";
import HTTP_STATUS from "../constants/statusCodes.ts";
import { validationResult, ValidationError } from "express-validator";
import sendResponse, { checkValidation } from "../util/common.ts";
import CourseModel from "../model/CourseModel.ts";
import ChapterModel from "../model/ChapterModel.ts";
// import CourseRepository from "../repository/Course/index.ts";
import ChapterRepository from "../repository/Chapter/index.ts";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import SubchapterModel from "../model/SubchapterModel.ts";

class Chapter {
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

            const { chapters, chaptersCount } = await ChapterRepository.getAll();

            // console.log(courses);
            if (chapters) {
                return sendResponse(res, HTTP_STATUS.OK, "Successfully got all the chapters", {
                    total: chaptersCount,
                    // count: products.length,
                    // page: parseInt(page),
                    // limit: parseInt(limit),
                    chapters: chapters,
                });
            } else {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No chapters found");
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    // gets only one product
    async getOne(req: Request, res: Response) {
        try {
            const validation: ValidationError[] = validationResult(req).array();
            // console.log(validation);
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to get the course", validation[0].msg);
            }

            const { id } = req.params;

            const chapter = await ChapterRepository.getOne(new mongoose.Types.ObjectId(id));

            if (chapter.length) {
                return sendResponse(res, HTTP_STATUS.OK, "Successfully got the chapter", chapter);
            } else {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "chapters with this ID doesnt exist");
            }
        } catch (error) {
            console.log("error", error);
            return sendResponse(res, HTTP_STATUS.BAD_REQUEST, "internal server error");
        }
    }

    // adds
    async add(req: Request, res: Response) {
        try {
            const { title, description, course } = req.body;
            const validation = checkValidation(req);
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to add the course", validation);
            }

            // console.log("Req Body", req.body);

            const existingCourse = await CourseModel.findById({ _id: course }).populate("chapters");

            if (!existingCourse) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Course does not exist");
            }

            if (existingCourse.chapters.includes(title)) {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Chapter already exists");
            }
            // console.log(subChapters);
            // const subChaptersResult: any = await SubchapterModel.create(subChapters);

            // console.log(subChaptersResult);

            const chapter = await ChapterRepository.add(
                title,
                // subChaptersResult.map((element: { _id: mongoose.Types.ObjectId }) => {
                //     return element._id;
                // }),
                description,
                course
            );

            // await chapter.save();

            return sendResponse(res, HTTP_STATUS.CREATED, "Chapter Added Successfully", chapter);
        } catch (error) {
            console.log("error", error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal server error");
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
            const chapterId = req.params.id;
            // Find the item by ID and delete it
            const deletedChapter = await ChapterRepository.delete(new mongoose.Types.ObjectId(chapterId));
            console.log("deletedChapter", deletedChapter);

            if (!deletedChapter) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "chapter not found");
            }

            return sendResponse(res, HTTP_STATUS.ACCEPTED, "chapter deleted successfully", deletedChapter);
        } catch (error) {
            console.error(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    // updates
    async update(req: Request, res: Response) {
        try {
            const productId = req.params.id;
            const updatedChapterData = req.body;

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

            const updatedChapter = await ChapterRepository.update(
                new mongoose.Types.ObjectId(productId),
                updatedChapterData
            );

            if (!updatedChapter) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Item not found" });
            }
            console.log(updatedChapter);

            return sendResponse(res, HTTP_STATUS.ACCEPTED, "chapter updated successfully", updatedChapter);
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "INTERNAL SERVER ERROR" });
        }
    }
}

export default new Chapter();
