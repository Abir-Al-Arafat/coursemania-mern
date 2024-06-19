import mongoose, { Document, Schema, Types } from "mongoose";
import { IUser } from "../interfaces/user.ts";
export interface IInstructor extends IUser {
    uploadedCourses: Types.ObjectId[];
    favourites: string[];
    role: "instructor";
    location: {
        city: string;
        country: string;
    };
}

const instructorSchema = new Schema<IInstructor>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    verified: { type: Boolean, default: false },
    phone: { type: String, required: true },
    uploadedCourses: {
        type: [Types.ObjectId],
        ref: "Course",
        default: [],
    },
    favourites: {
        type: [Types.ObjectId],
        ref: "Course",
        default: [],
    },
    role: {
        type: String,
        enum: ["instructor"],
        default: "instructor",
    },
    location: {
        type: {
            city: String,
            country: String,
        },
        required: true,
        _id: false,
    },
});

const InstructorModel = mongoose.model<IInstructor>("Instructor", instructorSchema);

export default InstructorModel;
