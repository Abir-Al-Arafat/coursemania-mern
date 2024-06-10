import { Document, Schema, model, Types } from "mongoose";

export interface ISubmission {
    learner: Types.ObjectId;
    fileUrl: string;
    points?: number;
    feedback?: string;
}

interface IAssignment {
    title: string;
    description: string;
    dueDate: Date;
    maxPoints: number;
    course: Types.ObjectId;
    chapters: Types.ObjectId[];
    subChapter: Types.ObjectId;
    createdBy: Types.ObjectId;
    submissions: ISubmission[];
    isDeleted: boolean;
}

const assignmentSchema = new Schema<IAssignment>({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
    },
    maxPoints: {
        type: Number,
        required: [true, "Maximum points are required"],
        // min: [0, "Points cannot be negative"],
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        // required: [true, "Course is required"],
    },
    chapters: [
        {
            type: Schema.Types.ObjectId,
            ref: "Chapter",
            // required: [true, "Course is required"],
        },
    ],
    subChapter: {
        type: Schema.Types.ObjectId,
        // ref: "Chapter",
        // required: [true, "Course is required"],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Instructor",
        required: [true, "Instructor is required"],
    },
    submissions: [
        {
            learner: {
                type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId here
                ref: "Learner",
                required: true,
            },
            fileUrl: {
                type: String,
                required: true,
            },
            points: {
                type: Number,
                // min: [0, "Points cannot be negative"],
            },
            feedback: {
                type: String,
            },
        },
    ],
    isDeleted: { type: Boolean, default: false },
});

const AssignmentModel = model<IAssignment>("Assignment", assignmentSchema);

export default AssignmentModel;
