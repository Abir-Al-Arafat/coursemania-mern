import { Document, Schema, Types, model } from "mongoose";
import { IQuiz } from "../interfaces/common";

const quizSchema = new Schema<IQuiz>({
    title: { type: String, required: true },
    questions: {
        type: [
            {
                text: { type: String, required: true },
                options: { type: [{ value: String }], required: true, _id: true },
                correctOptionIndex: { type: Number, required: true },
            },
        ],
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Instructor",
        required: true,
    },
    chapters: [
        {
            type: Schema.Types.ObjectId,
            ref: "Chapter",
            // required: true,
        },
    ],
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course",
            // required: true,
        },
    ],
    isDeleted: { type: Boolean, default: false },
});

const QuizModel = model<IQuiz>("Quiz", quizSchema);

export default QuizModel;
