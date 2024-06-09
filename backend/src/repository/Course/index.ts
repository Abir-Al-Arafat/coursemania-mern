import mongoose from "mongoose";
import CourseModel from "../../model/CourseModel.ts";

class CourseRepository {
    async getAll(page: number, limit: number) {
        const courses = await CourseModel.find({})
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("chapters");
        const courseCount = await CourseModel.find({}).count();
        return { courses, courseCount };
    }

    async getOne(id: mongoose.Types.ObjectId) {
        const course = await CourseModel.find({ _id: id }).populate({
            path: "chapters",
            model: "Chapter",
            populate: {
                path: "subChapters",
                model: "Subchapter",
            },
        });
        return course;
    }

    async add(
        title: string,
        category: string,
        // chapters: Object[],
        description: string,
        releaseDate: Date,
        instructors: mongoose.Types.ObjectId[],
        img?: string
    ) {
        const course = new CourseModel({
            title,
            category,
            // chapters,
            description,
            releaseDate,
            instructors: instructors,
            img,
        });

        await course.save();

        return course;
    }

    async update(courseId: mongoose.Types.ObjectId, updatedCourseData: Object) {
        const updatedCourse = await CourseModel.findByIdAndUpdate(
            courseId,
            updatedCourseData,
            // Returns the updated document
            { new: true }
        );

        return updatedCourse;
    }
}

export default new CourseRepository();
