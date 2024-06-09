import mongoose from "mongoose";
import { ISubchapter } from "../interfaces/common.ts";

const subchapterSchema = new mongoose.Schema<ISubchapter>(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        video: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        compressed: {
            type: String,
            required: false,
        },
        pdf: {
            type: String,
            required: false,
        },
        presentation: {
            type: String,
            required: false,
        },
        quiz: {
            type: mongoose.Types.ObjectId,
            ref: "Quiz",
        },
        assignment: {
            type: mongoose.Types.ObjectId,
            ref: "Assignment",
        },
    },
    { timestamps: true }
);

const SubchapterModel = mongoose.model<ISubchapter>("Subchapter", subchapterSchema);

export default SubchapterModel;
