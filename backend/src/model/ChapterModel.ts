import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title was not provided"],
            minLength: 1,
        },
        subChapters: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "Subchapter",
                },
            ],
        },
        description: {
            type: String,
            required: [true, "description was not provided"],
        },
        course: {
            type: mongoose.Types.ObjectId,
            ref: "Course",
        },
    }
    // { timestamps: true }
);

const ChapterModel = mongoose.model("Chapter", chapterSchema);

export default ChapterModel;
