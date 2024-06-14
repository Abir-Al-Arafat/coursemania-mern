import mongoose from "mongoose";
import ChapterModel from "../../model/ChapterModel.ts";
import CourseModel from "../../model/CourseModel.ts";
import CartModel from "../../model/CartModel.ts";
import ChapterRepository from "../Chapter/index.ts";

class CartRepository {
  async getAll() {
    const carts = await CartModel.find({})
      .populate("learner")
      .populate("courses.course");
    const cartsCount = await CartModel.find({}).count();
    return { carts, cartsCount };
  }

  // get cart by cart id
  async getCartByCartId(id: mongoose.Types.ObjectId) {
    const cart = await CartModel.find({ _id: id })
      .populate("learner")
    return cart;
  }

  async add(
    title: string,
    questions: [],
    createdBy: mongoose.Types.ObjectId,
    chapter: mongoose.Types.ObjectId
  ) {
    const quiz = new CartModel({
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
    questions: Object[],
    createdBy: mongoose.Types.ObjectId,
    chapterId: mongoose.Types.ObjectId
  ) {
    const quiz = new CartModel({
      title,
      questions,
      createdBy,
      chapters: [chapterId],
    });

    console.log("chapter id", chapterId);

    const existingChapter = await ChapterRepository.getOne(
      new mongoose.Types.ObjectId(chapterId)
    );

    console.log("existingChapter", existingChapter);

    if (!existingChapter.length) {
      return null;
    }

    console.log("quiz", quiz);

    console.log("existingChapter", existingChapter);
    // console.log("existingCourse id", existingChapter[0]._id);
    const existingChapterId = existingChapter[0]._id;

    const chapterCollection = await ChapterModel.findByIdAndUpdate(
      existingChapterId,
      // { course: chapter._id },
      { $push: { quizzes: quiz._id } },
      { new: true }
    );

    await quiz.save();
    await chapterCollection?.save();

    return quiz;
  }

  async addToSubChapter(
    title: string,
    questions: Object[],
    createdBy: mongoose.Types.ObjectId,
    chapterId: mongoose.Types.ObjectId,
    subChapterId: mongoose.Types.ObjectId,
    subChaptertitle: string
  ) {
    const quiz = new CartModel({
      title,
      questions,
      createdBy,
      chapters: [chapterId],
    });

    console.log("course id", chapterId);

    const existingChapter = await ChapterRepository.getOne(
      new mongoose.Types.ObjectId(chapterId)
    );

    console.log("existingChapter", existingChapter);

    if (!existingChapter.length) {
      return null;
    }

    console.log("quiz", quiz);

    console.log("existingChapter", existingChapter);

    console.log("Sub Chapter", existingChapter[0].subChapters);

    // console.log("existingCourse id", existingChapter[0]._id);
    const existingCourseId = existingChapter[0]._id;

    // const chapterCollection = await ChapterModel.findByIdAndUpdate(
    //   existingCourseId,
    //   // { course: chapter._id },
    //   { $push: { subChapters: quiz._id } },
    //   { new: true }
    // );

    // const chapterCollection = await ChapterModel.findOneAndUpdate(
    //   { _id: chapterId, 'subChapters._id': subChapterId },
    //   { $set: { 'subChapters.$.quiz': quiz._id } },
    //   { new: true }
    // )

    ChapterModel.findOneAndUpdate(
      { _id: chapterId, "subChapters._id": subChapterId },
      { $set: { "subChapters.$.quiz": quiz._id } },
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

    // console.log("chapterCollection", chapterCollection);

    await quiz.save();
    // await chapterCollection?.save();

    return quiz;
  }

  async update(quizId: mongoose.Types.ObjectId, updatedQuizData: Object) {
    const updatedQuiz = await CartModel.findByIdAndUpdate(
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

export default new CartRepository();
