import mongoose from "mongoose";
import ChapterModel from "../../model/ChapterModel.ts";
import CourseModel from "../../model/CourseModel.ts";
import CourseRepository from "../Course/index.ts";

class ChapterRepository {
  async getAll() {
    const chapters = await ChapterModel.find({}).populate("course");
    const chaptersCount = await ChapterModel.find({}).count();
    return { chapters, chaptersCount };
  }

  async getOne(id: mongoose.Types.ObjectId) {
    const chapter = await ChapterModel.find({ _id: id })
      // .populate("quizzes")
      //   .populate("assignments")
      .populate("subChapters")
      .populate("subChapters.assignment");
    return chapter;
  }

  async add(
    title: string,
    // subChapters: any[],
    description: string,
    course: mongoose.Types.ObjectId
  ) {
    const chapter = new ChapterModel({
      title,
      // subChapters,
      description,
      course,
    });

    const courseCollection = await CourseModel.findByIdAndUpdate(
      course,
      { $push: { chapters: chapter._id } },
      { new: true }
    );

    await chapter.save();
    await courseCollection?.save();

    return chapter;
  }

  async update(chapterId: mongoose.Types.ObjectId, updatedChapterData: Object) {
    const updatedChapter = await ChapterModel.findByIdAndUpdate(
      chapterId,
      updatedChapterData,
      { new: true }
    );

    return updatedChapter;
  }

  async delete(chapterId: mongoose.Types.ObjectId) {
    const chapter = await this.getOne(chapterId);
    console.log("chapter", chapter[0].course);
    const courseId = chapter[0].course;

    const deletedChapter = await ChapterModel.findByIdAndDelete(chapterId);
    console.log("deleted item", deletedChapter);

    const courseCollection = await CourseModel.findByIdAndUpdate(
      courseId,
      // { course: chapter._id },
      { $pull: { chapters: chapterId } },
      { new: true }
    );
    return { deletedChapter, courseCollection };
  }
}

export default new ChapterRepository();
