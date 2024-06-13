import mongoose from "mongoose";
import ChapterModel from "../../model/ChapterModel.ts";
import CourseModel from "../../model/CourseModel.ts";
import CourseRepository from "../Course/index.ts";
import AuthModel from "../../model/AuthModel.ts";
import LearnerModel from "../../model/LearnerModel.ts";
import InstructorModel from "../../model/InstructorModel.ts";

class AuthRepository {
    async getAllUsers() {
        const users = await AuthModel.find({}).populate("learner").populate("instructor").populate("admin");
        const userCount = await AuthModel.find({}).count();
        return { users, userCount };
    }

    async getAllLearners() {
        const learners = await LearnerModel.find({});
        const learnersCount = await LearnerModel.find({}).count();
        return { learners, learnersCount };
    }

    async getAllInstructors() {
        const instructors = await InstructorModel.find({});
        const instructorsCount = await InstructorModel.find({}).count();
        return { instructors, instructorsCount };
    }

    async getOne(id: mongoose.Types.ObjectId) {
        const user = await AuthModel.find({ _id: id }).populate("learner").populate("instructor").populate("admin");
        return user;
    }

    //   async add(
    //     title: string,
    //     subChapters: number,
    //     description: string,
    //     course: mongoose.Types.ObjectId
    //   ) {
    //     const chapter = new ChapterModel({
    //       title,
    //       subChapters,
    //       description,
    //       course,
    //     });

    //     console.log("course id", course._id);

    //     const existingCourse = await CourseRepository.getOne(course);

    //     console.log("chapter", chapter);

    //     console.log("existingCourse", existingCourse);
    //     console.log("existingCourse id", existingCourse[0]._id);
    //     const existingCourseId = existingCourse[0]._id;

    //     const courseCollection = await CourseModel.findByIdAndUpdate(
    //       existingCourseId,
    //       // { course: chapter._id },
    //       { $push: { chapters: chapter._id } },
    //       { new: true }
    //     );

    //     await chapter.save();
    //     await courseCollection?.save();

    //     return chapter;
    //   }

    //   async update(chapterId: mongoose.Types.ObjectId, updatedChapterData: Object) {
    //     const updatedChapter = await ChapterModel.findByIdAndUpdate(
    //       chapterId,
    //       updatedChapterData,
    //       // Returns the updated document
    //       { new: true }
    //     );

    //     return updatedChapter;
    //   }

    //   async delete(chapterId: mongoose.Types.ObjectId) {
    //     const chapter = await this.getOne(chapterId);
    //     console.log("chapter", chapter[0].course);
    //     const courseId = chapter[0].course;

    //     const deletedChapter = await ChapterModel.findByIdAndDelete(chapterId);
    //     console.log("deleted item", deletedChapter);

    //     const courseCollection = await CourseModel.findByIdAndUpdate(
    //       courseId,
    //       // { course: chapter._id },
    //       { $pull: { chapters: chapterId } },
    //       { new: true }
    //     );
    //     return { deletedChapter, courseCollection };
    //   }
}

export default new AuthRepository();
