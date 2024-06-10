import mongoose from "mongoose";
import ChapterModel from "../../model/ChapterModel.ts";
import CourseModel from "../../model/CourseModel.ts";
import AssignmentModel, { ISubmission } from "../../model/AssignmentModel.ts";
import ChapterRepository from "../Chapter/index.ts";

class AssignmentRepository {
    async getAll() {
        const assignment = await AssignmentModel.find({}).populate("chapters").populate("createdBy");
        const assignmentCount = await AssignmentModel.find({}).count();
        return { assignment, assignmentCount };
    }

    async getOne(id: mongoose.Types.ObjectId) {
        const assignment = await AssignmentModel.find({ _id: id }).populate("chapters").populate("createdBy");
        return assignment;
    }

    async add(title: string, questions: [], createdBy: mongoose.Types.ObjectId, chapter: mongoose.Types.ObjectId) {
        const quiz = new AssignmentModel({
            title,
            questions,
            createdBy,
            course: chapter,
        });

        console.log("course id", chapter._id);

        const existingCourse = await ChapterRepository.getOne(chapter);

        console.log("quiz", quiz);

        console.log("existingCourse", existingCourse);
        console.log("existingCourse id", existingCourse[0]._id);
        const existingCourseId = existingCourse[0]._id;

        const courseCollection = await CourseModel.findByIdAndUpdate(
            existingCourseId,
            // { course: chapter._id },
            { $push: { chapters: quiz._id } },
            { new: true }
        );

        await quiz.save();
        await courseCollection?.save();

        return quiz;
    }

    async addToChapter(
        title: string,
        description: string,
        dueDate: Date,
        maxPoints: Number,
        createdBy: mongoose.Types.ObjectId,
        chapterId: mongoose.Types.ObjectId
    ) {
        const assignment = new AssignmentModel({
            title,
            description,
            dueDate,
            maxPoints,
            createdBy,
            chapters: [chapterId],
        });

        console.log("chapter id", chapterId);

        const existingChapter = await ChapterRepository.getOne(new mongoose.Types.ObjectId(chapterId));

        console.log("existingChapter", existingChapter);

        if (!existingChapter.length) {
            return null;
        }

        console.log("assignment", assignment);

        console.log("existingChapter", existingChapter);
        // console.log("existingCourse id", existingChapter[0]._id);
        const existingChapterId = existingChapter[0]._id;

        const chapterCollection = await ChapterModel.findByIdAndUpdate(
            existingChapterId,
            // { course: chapter._id },
            { $push: { assignments: assignment._id } },
            { new: true }
        );

        await assignment.save();
        await chapterCollection?.save();

        return assignment;
    }

    async addToSubChapter(
        title: string,
        description: string,
        dueDate: Date,
        maxPoints: Number,
        createdBy: mongoose.Types.ObjectId,
        chapterId: mongoose.Types.ObjectId,
        subChapterId: mongoose.Types.ObjectId
    ) {
        const assignment = new AssignmentModel({
            title,
            description,
            dueDate,
            maxPoints,
            createdBy,
            chapters: [chapterId],
            subChapter: subChapterId,
        });

        console.log("chapter id", chapterId);

        const existingChapter = await ChapterRepository.getOne(new mongoose.Types.ObjectId(chapterId));

        console.log("existingChapter", existingChapter);

        if (!existingChapter.length) {
            return null;
        }

        console.log("assignment", assignment);

        console.log("existingChapter", existingChapter);

        console.log("Sub Chapter", existingChapter[0].subChapters);

        // console.log("existingCourse id", existingChapter[0]._id);
        const existingCourseId = existingChapter[0]._id;

        ChapterModel.findOneAndUpdate(
            { _id: chapterId, "subChapters._id": subChapterId },
            { $set: { "subChapters.$.assignment": assignment._id } },
            { new: true }
        )
            .then((updatedChapter) => {
                if (updatedChapter) {
                    console.log("updatedChapter", updatedChapter);
                } else {
                    console.log("No chapter or subchapter found.");
                }
            })
            .catch((error) => {
                console.error(error);
            });

        await assignment.save();

        return assignment;
    }

    async update(assignmentId: mongoose.Types.ObjectId, updatedAssignmentData: Object) {
        const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
            assignmentId,
            updatedAssignmentData,
            // Returns the updated document
            { new: true }
        );

        return updatedAssignment;
    }

    async delete(assignmentId: mongoose.Types.ObjectId) {
        const assignment = await AssignmentModel.findById(assignmentId);
        if (!assignment) {
            // console.error("Quiz not found!");
            return null;
        }

        const updatedIsDeleted = !assignment.isDeleted;

        const deletedAssignment = await AssignmentModel.updateOne(
            { _id: assignmentId },
            { $set: { isDeleted: updatedIsDeleted } }
        );

        return deletedAssignment;
    }
}

export default new AssignmentRepository();
