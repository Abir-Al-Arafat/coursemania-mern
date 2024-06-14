import { Request, Response } from "express";
import HTTP_STATUS from "../constants/statusCodes.ts";
import sendResponse from "../util/common.ts";
import mongoose from "mongoose";
import SubmissionModel from "../model/SubmissionModel.ts";
import QuizModel from "../model/QuizModel.ts";

class Submission {
    async add(req: Request, res: Response) {
        try {
            const { quizId } = req.body;

            const quiz = await QuizModel.findById(quizId);

            if (!quiz) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Could not find quiz");
            }

            const existingSubmission = await SubmissionModel.findOne({ quiz: quizId });

            if (existingSubmission) {
                return sendResponse(res, HTTP_STATUS.OK, "Submission already exists");
            }

            const submission = await SubmissionModel.create({
                quiz: quizId,
                answers: quiz.questions,
                learner: req.body.userId,
            });
            console.log(submission);
            return sendResponse(res, HTTP_STATUS.OK, "Created submission successfully");
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }

    async addAnswer(req: Request, res: Response) {
        try {
            const { questionId, quizId } = req.params;
            const { answer } = req.body;

            const submissionCompleted = await SubmissionModel.findOne({ quiz: quizId });

            if (!submissionCompleted) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Could not find submission");
            }

            if (submissionCompleted.completed) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Submission was already completed");
            }

            const question = await QuizModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(quizId),
                        "questions._id": new mongoose.Types.ObjectId(questionId),
                    },
                },
                { $unwind: "$questions" },
                { $replaceRoot: { newRoot: "$questions" } },
                { $match: { _id: new mongoose.Types.ObjectId(questionId) } },
            ]).exec();

            if (!question[0]) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Could not find quiz");
            }

            const updateObject: any = {
                "answers.$.answer": answer,
            };

            if (question[0].correctOptionIndex === answer) {
                updateObject["answers.$.correct"] = true;
                // updateObject["$inc"] = { total: 1 };
            } else {
                updateObject["answers.$.correct"] = false;
                // updateObject["$inc"] = { total: -1 };
            }

            console.log(updateObject);

            const submission = await SubmissionModel.findOneAndUpdate(
                { quiz: new mongoose.Types.ObjectId(quizId), "answers._id": questionId },
                {
                    $set: updateObject,
                    // $inc: { total: question[0].correctOptionIndex === answer ? 1 : -1 },
                },
                { new: true }
            );

            if (!submission) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Could not find quiz");
            }
            return sendResponse(res, HTTP_STATUS.ACCEPTED, "Answered question");
            // console.log(submission.answers.filter((element) => element.answer !== null).length === 0);

            // if (submission && submission.answers.filter((element) => element.answer !== null).length !== 0) {
            //     submission.completed = true;
            // }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }

    async submit(req: Request, res: Response) {
        try {
            const { quizId } = req.body;
            console.log(quizId);

            const quiz = await QuizModel.findById(quizId);

            if (!quiz) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Could not find quiz");
            }

            const submission = await SubmissionModel.findOne({ quiz: quizId });

            if (!submission) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Could not find submission");
            }

            if (submission.answers.filter((element) => element.answer === null).length !== 0) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Quiz is not completed");
            }

            const total = submission.answers.reduce((accumulator, element) => {
                return accumulator + (element.correct ? 1 : 0);
            }, 0);

            submission.total = total;
            submission.completed = true;

            submission.save();

            // if (existingSubmission) {
            return sendResponse(res, HTTP_STATUS.OK, "Quiz submitted", submission);
            // }

            // const submission = await SubmissionModel.create({
            //     quiz: quizId,
            //     answers: quiz.questions,
            //     learner: req.body.userId,
            // });
            // console.log(submission);
            // return sendResponse(res, HTTP_STATUS.OK, "Created submission successfully");
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }
}

export default new Submission();
