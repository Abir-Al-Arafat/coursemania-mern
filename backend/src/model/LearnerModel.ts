import mongoose, { Document, Schema, Types } from "mongoose";
import { IUser } from "../interfaces/user.ts";
import { CourseItem } from "./CartModel.ts";
import { IReview, IReviewItem } from "./ReviewModel.ts";

export interface ILearner extends IUser {
    enrolledCourses: Types.ObjectId[];
    cart: Types.ObjectId[] | CourseItem[];
    courseProgress: { courseId: Types.ObjectId; progress: number }[];
    wishlist: { courseId: Types.ObjectId }[] | CourseItem[];
    reviews: Types.ObjectId[];
    favourites: { courseId: Types.ObjectId }[];
    marks: {
        courseId: Types.ObjectId;
        quizId: Types.ObjectId;
        assignmentID: Types.ObjectId;
        mark: number;
    }[];
    role: "learner";
}

const learnerSchema = new Schema<ILearner>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    verified: { type: Boolean, default: false },
    phone: { type: String, required: true },
    enrolledCourses: {
        type: [Types.ObjectId],
        ref: "Course",
        default: [],
    },
    cart: {
        type: [Types.ObjectId],
        ref: "Cart",
        default: [],
    },
    courseProgress: {
        type: [Types.ObjectId],
        progress: Number,
        ref: "Course",
        default: [],
    },
    wishlist: {
        type: [Types.ObjectId],
        ref: "Course",
        default: [],
    },
    reviews: {
        type: [Types.ObjectId],
        ref: "Review",
        default: [],
    },
    favourites: {
        type: [Types.ObjectId],
        ref: "Course",
        default: [],
    },
    role: {
        type: String,
        enum: ["learner"],
        default: "learner",
    },
});

const LearnerModel = mongoose.model<ILearner>("Learner", learnerSchema);

export default LearnerModel;
