import mongoose, { Document, Schema, Types } from "mongoose";
import { IUser } from "../interfaces/user.ts";
export interface IAdmin extends IUser {
    pendingCourseApprovals: Types.ObjectId[];
    approvedCourses: Types.ObjectId[];
    editedCourses: Types.ObjectId[];
    deletedCourses: Types.ObjectId[];
    pendingSubscriberApprovals: Types.ObjectId[];
    approvedSubscribers: Types.ObjectId[];
    editedSubscribers: Types.ObjectId[];
    removedSubscribers: Types.ObjectId[];
    favourites: { courseId: Types.ObjectId }[];
    role: "admin";
}

const adminSchema = new Schema<IAdmin>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    verified: { type: Boolean, default: false },
    phone: { type: String, required: true },
    pendingCourseApprovals: {
        type: [Types.ObjectId],
        ref: "Course",
        default: [],
    },
    approvedCourses: {
        type: [Types.ObjectId],
        ref: "Course",
        default: [],
    },
    editedCourses: {
        type: [Types.ObjectId],
        ref: "Course",
        default: [],
    },
    deletedCourses: {
        // type: [Types.ObjectId],
        type: [],
        // ref: "deletedCourse",
        default: [],
    },
    pendingSubscriberApprovals: {
        type: [Types.ObjectId],
        ref: "Learner",
        default: [],
    },
    approvedSubscribers: {
        type: [Types.ObjectId],
        ref: "Learner",
        default: [],
    },
    editedSubscribers: {
        type: [Types.ObjectId],
        ref: "Learner",
        default: [],
    },
    removedSubscribers: {
        type: [],
        // ref: "Learner",
        default: [],
    },
    favourites: {
        type: [Types.ObjectId],
        ref: "Course",
        default: [],
    },
    role: {
        type: String,
        enum: ["admin"],
        default: "admin",
    },
});

const AdminModel = mongoose.model<IAdmin>("Admin", adminSchema);

export default AdminModel;
