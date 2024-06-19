import { Document, Schema, Types, model } from "mongoose";
import { IProgress } from "../interfaces/common";

const quizSchema = new Schema<IProgress>({
    // title: { type: String, required: true },
    // questions: {
    //     type: [
    //         {
    //             text: { type: String, required: true },
    //             options: { type: [{ value: String, id: Number }], required: true, _id: false },
    //             correctOptionIndex: { type: Number, required: true },
    //         },
    //     ],
    //     required: false,
    // },
    // createdBy: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Instructor",
    //     required: true,
    // },
    // courses: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Course",
    //         // required: true,
    //     },
    // ],
    // isDeleted: { type: Boolean, default: false },
});

const QuizModel = model<IProgress>("Quiz", quizSchema);

export default QuizModel;
