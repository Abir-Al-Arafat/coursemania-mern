import { Document, Schema, Types, model } from "mongoose";
import { ISubmission } from "../interfaces/common";

const submissionSchema = new Schema<ISubmission>({
    quiz: {
        type: Types.ObjectId,
        ref: "Quiz",
        required: true,
    },
    learner: {
        type: Types.ObjectId,
        ref: "Learner",
        required: true,
    },
    answers: [
        {
            question: Types.ObjectId,
            answer: { type: Number || null, default: null },
            correct: { type: Boolean, default: false },
        },
    ],
    total: { type: Number, min: 0, default: 0 },
    completed: { type: Boolean, default: false },
});

const SubmissionModel = model<ISubmission>("Submission", submissionSchema, "submissions");

export default SubmissionModel;
