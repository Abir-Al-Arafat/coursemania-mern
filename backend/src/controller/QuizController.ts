import { Request, Response } from "express";
import HTTP_STATUS from "../constants/statusCodes.ts";
import { validationResult, ValidationError } from "express-validator";
import sendResponse from "../util/common.ts";
import QuizRepository from "../repository/Quiz/index.ts";
import { Types } from "mongoose";
import ChapterModel from "../model/ChapterModel.ts";
import QuizModel from "../model/QuizModel.ts";
import SubchapterModel from "../model/SubchapterModel.ts";

class Quiz {
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

            const { quizzes, quizCount } = await QuizRepository.getAll();

            // console.log(courses);
            if (quizzes) {
                return sendResponse(res, HTTP_STATUS.OK, "Successfully got all the quizzes", {
                    total: quizCount,
                    // count: products.length,
                    // page: parseInt(page),
                    // limit: parseInt(limit),
                    quizzes: quizzes,
                });
            } else {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No quizzes found");
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

            const quiz = await QuizRepository.getOne(new Types.ObjectId(id));

            if (quiz.length) {
                return sendResponse(res, HTTP_STATUS.OK, "Successfully got the quiz", quiz);
            } else {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "quiz with this ID doesnt exist");
            }
        } catch (error) {
            console.log("error", error);
            return sendResponse(res, HTTP_STATUS.BAD_REQUEST, "internal server error");
        }
    }

    // adds
    async add(req: Request, res: Response) {
        try {
            const validation = validationResult(req).array();
            // console.log(validation);
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to add the course", validation[0].msg);
            }
            const { title, questions, courseId, createdBy, chapterId, subChapterId } = req.body;

            // console.log("Req Body", req.body);
            // const img = req.file.filename;
            // console.log("img", img);

            // const chapter = await ChapterRepository.add(title, description, courseId, createdBy);
            // const chapter = await ChapterModel.create({ title, description, courseId, createdBy });

            const chapter = await ChapterModel.findById({ _id: new Types.ObjectId(chapterId) });

            if (!chapter) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Could not find chapter");
            }

            const subChapter = await SubchapterModel.findById(subChapterId);

            if (!subChapter) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Could not find subchapter");
            }

            // if (!subChapter.quiz) {
            //     return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Could not find subchapter");
            // }

            const quiz = await QuizModel.create({
                title: title,
                // description: description,
                questions: questions,
                courses: courseId,
                chapters: chapterId,
                createdBy: createdBy,
            });

            // quiz.questions.map((element) => {
            //     console.log({ correctOptionIndex: element.options[element.correctOptionIndex]._id });
            //     return { ...element, correctOptionIndex: element.options[element.correctOptionIndex]._id };
            //     // return (element.correctOptionIndex = );
            // });

            // console.log(quiz);

            subChapter.quiz = quiz._id;
            subChapter.save();

            return sendResponse(res, HTTP_STATUS.CREATED, "Quiz Added Successfully", quiz);
        } catch (error) {
            console.log("error", error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal server error");
        }
    }

    // adds quiz to chapter
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
            const { title, questions, createdBy, chapterId } = req.body;

            console.log("Req Body", req.body);
            // const img = req.file.filename;
            // console.log("img", img);

            const addedChapter = await QuizRepository.addToChapter(
                title,
                questions,
                createdBy,
                new Types.ObjectId(chapterId)
            );

            if (!addedChapter) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to add the quiz to the chapter");
            }
            // await chapter.save();

            return sendResponse(res, HTTP_STATUS.CREATED, "Quiz Added Successfully to a chapter", addedChapter);
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
            const { title, questions, createdBy, chapterId, subChapterId, subChaptertitle } = req.body;

            console.log("Req Body", req.body);
            // const img = req.file.filename;
            // console.log("img", img);

            const addedQuiz = await QuizRepository.addToSubChapter(
                title,
                questions,
                createdBy,
                new Types.ObjectId(chapterId),
                new Types.ObjectId(subChapterId),
                subChaptertitle
            );

            if (!addedQuiz) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to add the quiz to the chapter");
            }
            // await chapter.save();

            return sendResponse(res, HTTP_STATUS.CREATED, "Quiz Added Successfully to a sub chapter", addedQuiz);
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
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to remove the course", validation[0].msg);
            }
            const quizId = req.params.id;
            // Find the item by ID and delete it
            const deletedQuiz = await QuizRepository.delete(new Types.ObjectId(quizId));
            console.log("deletedQuiz", deletedQuiz);

            if (!deletedQuiz) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "quiz not found");
            }

            return sendResponse(res, HTTP_STATUS.ACCEPTED, "quiz deleted successfully", deletedQuiz);
        } catch (error) {
            console.error(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    // updates
    async update(req: Request, res: Response) {
        try {
            const quizId = req.params.id;
            const updatedQuizData = req.body;

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

            const updatedQuiz = await QuizRepository.update(new Types.ObjectId(quizId), updatedQuizData);

            if (!updatedQuiz) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Quiz couldnt be updated", updatedQuiz);
            }
            console.log(updatedQuiz);

            return sendResponse(res, HTTP_STATUS.ACCEPTED, "Quiz updated successfully", updatedQuiz);
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "INTERNAL SERVER ERROR" });
        }
    }
}

export default new Quiz();
