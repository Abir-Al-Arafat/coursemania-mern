import mongoose from "mongoose";
import { ICourse } from "../interfaces/common.ts";

const courseSchema = new mongoose.Schema<ICourse>(
    {
        title: {
            type: String,
            required: [true, "title was not provided"],
            minLength: 1,
        },
        category: {
            type: String,
            required: [true, "category was not provided"],
        },
        chapters: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Chapter",
                default: [],
            },
        ],
        students: [
            {
                // type: [{name: String, _id:false}],
                type: mongoose.Types.ObjectId,
                ref: "Student",
            },
        ],
        instructors: [
            {
                // type: [{name: String, _id:false}],
                type: mongoose.Types.ObjectId,
                ref: "Instructor",
                required: true,
            },
        ],
        tags: {
            type: [String],
            default: [],
        },
        description: {
            type: String,
            required: [true, "description was not provided"],
        },
        releaseDate: {
            type: Date,
            // required: [true, 'date wasnt provided'],
        },
        img: {
            type: String,
        },
        published: {
            type: String,
            required: false,
            default: "pending",
        },
    },
    { timestamps: true }
);

const CourseModel = mongoose.model<ICourse>("Course", courseSchema);

export default CourseModel;
