import mongoose from "mongoose";
import ChapterModel from "../../model/ChapterModel.ts";
import CourseModel from "../../model/CourseModel.ts";
import WishlistModel from "../../model/WishlistModel.ts";
import ChapterRepository from "../Chapter/index.ts";

class WishlistRepository {
  async getAll() {
    const wishlist = await WishlistModel.find({})
      .populate("learner")
      .populate("courses.course");
    const wishlistCount = await WishlistModel.find({}).count();
    return { wishlist, wishlistCount };
  }

  // get cart by cart id
  async getWishlistByWishlistId(id: mongoose.Types.ObjectId) {
    const wishlist = await WishlistModel.find({ _id: id })
      .populate("learner")
      .populate("courses.course");
    return wishlist;
  }

  async add(
    title: string,
    questions: [],
    createdBy: mongoose.Types.ObjectId,
    chapter: mongoose.Types.ObjectId
  ) {
    const quiz = new WishlistModel({
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

  async update(quizId: mongoose.Types.ObjectId, updatedQuizData: Object) {
    const updatedQuiz = await WishlistModel.findByIdAndUpdate(
      quizId,
      updatedQuizData,
      // Returns the updated document
      { new: true }
    );

    return updatedQuiz;
  }

  // async delete(quizId: mongoose.Types.ObjectId) {
  //   // const quiz = await this.getOne(quizId);
  //   // console.log("chapter", chapter[0].course);
  //   // const courseId = chapter[0].course;

  //   // working code
  //   // const deletedQuiz = await QuizModel.updateOne({ _id: quizId }, { $set: { isDeleted: false } })

  //   // console.log("deleted item", deletedQuiz);
  //   // working code

  //   const quiz = await CartModel.findById(quizId);
  //   if (!quiz) {
  //     // console.error("Quiz not found!");
  //     return null;
  //   }

  //   const updatedIsDeleted = !quiz.isDeleted;

  //   const deletedQuiz = await CartModel.updateOne(
  //     { _id: quizId },
  //     { $set: { isDeleted: updatedIsDeleted } }
  //   );

  //   return deletedQuiz;
  // }
}

export default new WishlistRepository();
