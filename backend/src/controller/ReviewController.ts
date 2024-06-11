import { Request, Response } from "express";
import { validationResult, ValidationError } from "express-validator";

import sendResponse from "../util/common.ts";
import HTTP_STATUS from "../constants/statusCodes.ts";

import ReviewModel from "../model/ReviewModel.ts";

import CourseModel from "../model/CourseModel.ts";

import AuthModel from "../model/AuthModel.ts";
import LearnerModel from "../model/LearnerModel.ts";
import CartRepository from "../repository/Cart/index.ts";
import WishlistRepository from "../repository/Wishlist/index.ts";
import ReviewRepository from "../repository/Review/index.ts";

import { ILearner } from "../model/LearnerModel.ts";
import mongoose, { Types } from "mongoose";

interface Learner {
  cart: any[]; // You can replace 'any' with a specific type if the array has a specific structure
  _id: Types.ObjectId;
  name: string;
  email: string;
  verified: boolean;
  phone: string;
  enrolledCourses: any[]; // Replace 'any' with a specific type if needed
  courseProgress: any[]; // Replace 'any' with a specific type if needed
  wishlist: any[]; // Replace 'any' with a specific type if needed
  reviews: any[]; // Replace 'any' with a specific type if needed
  favourites: any[]; // Replace 'any' with a specific type if needed
  role: "learner"; // Assuming 'role' is always 'learner'
  __v: number;
}

class ReviewController {
  async getAll(req: Request, res: Response) {
    try {
      // const {
      //   sortParam,
      //   sortOrder,
      //   search,
      //   name,
      //   author,
      //   price,
      //   priceFil,
      //   stock,
      //   stockFil,
      //   page,
      //   limit,
      // } = req.query;
      // if (page < 1 || limit < 0) {
      //   return res
      //     .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
      //     .send(failure("Page and limit values must be at least 1"));
      // }
      // if (
      //   (sortOrder && !sortParam) ||
      //   (!sortOrder && sortParam) ||
      //   (sortParam &&
      //     sortParam !== "stock" &&
      //     sortParam !== "price" &&
      //     sortParam !== "name") ||
      //   (sortOrder && sortOrder !== "asc" && sortOrder !== "desc")
      // ) {
      //   return res
      //     .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
      //     .send(failure("Invalid sort parameters provided"));
      // }
      // const filter = {};

      // if (price && priceFil) {
      //   if (priceFil === "low") {
      //     filter.price = { $lte: parseFloat(price) };
      //   } else {
      //     filter.price = { $gte: parseFloat(price) };
      //   }
      // }
      // if (stock && stockFil) {
      //   if (stockFil === "low") {
      //     filter.stock = { $lte: parseFloat(stock) };
      //   } else {
      //     filter.stock = { $gte: parseFloat(stock) };
      //   }
      // }

      // if (name) {
      //   filter.name = { $regex: name, $options: "i" };
      // }
      // if (author) {
      //   filter.author = { $in: author.toLowerCase() };
      // }
      // if (search) {
      //   filter["$or"] = [
      //     { name: { $regex: search, $options: "i" } },
      //     { author: { $regex: search, $options: "i" } },
      //   ];
      // }
      // console.log(filter.$or);
      // console.log(typeof Object.keys(JSON.parse(JSON.stringify(filter)))[0]);
      // const productCount = await ProductModel.find({}).count();
      // const products = await ProductModel.find(filter)
      //   .sort({
      //     [sortParam]: sortOrder === "asc" ? 1 : -1,
      //   })
      //   .skip((page - 1) * limit)
      //   .limit(limit ? limit : 10);
      // // console.log(products)
      // if (products.length === 0) {
      //   return res.status(HTTP_STATUS.OK).send(
      //     success("No products were found", {
      //       total: productCount,
      //       totalPages: null,
      //       count: 0,
      //       page: 0,
      //       limit: 0,
      //       products: [],
      //     })
      //   );
      // }

      const { reviews, reviewsCount } = await ReviewRepository.getAll();

      // console.log(courses);
      if (reviews) {
        return sendResponse(
          res,
          HTTP_STATUS.OK,
          "Successfully got all the reviews",
          {
            totalReviews: reviewsCount,
            // count: products.length,
            // page: parseInt(page),
            // limit: parseInt(limit),
            reviews: reviews,
          }
        );
      } else {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No reviews found");
      }
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
    }
  }

  // get review by course id
  async getReviewByCourseId(req: Request, res: Response) {
    try {
      const courseId = req.params.id;

      const review = await ReviewRepository.getReviewByCourseId(
        new mongoose.Types.ObjectId(courseId)
      );

      if (!review) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "review does not exist for course"
        );
      }

      console.log("review", review[0].course);

      // const reviewObject = review.toObject();
      // const learnerInfo: ILearner | Object | Learner = reviewObject.reviews;

      // delete cartObject.__v;
      // delete cartObject.learner.__v;

      return sendResponse(
        res,
        HTTP_STATUS.OK,
        `Successfully got review of ${review[0].course}`,
        review
      );
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
    }
  }

  // get review by review id
  async getReviewByReviewId(req: Request, res: Response) {
    try {
      // const validation: ValidationError[] = validationResult(req).array();
      // // console.log(validation);
      // if (validation.length > 0) {
      //   return sendResponse(
      //     res,
      //     HTTP_STATUS.NOT_FOUND,
      //     "Failed to get the course",
      //     validation[0].msg
      //   );
      // }

      const { id } = req.params;

      const review = await ReviewRepository.getReviewByReviewId(
        new mongoose.Types.ObjectId(id)
      );

      if (review.length) {
        return sendResponse(
          res,
          HTTP_STATUS.OK,
          "Successfully got the review",
          review
        );
      } else {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "review with this ID doesnt exist"
        );
      }
    } catch (error) {
      console.log("error", error);
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        "internal server error"
      );
    }
  }

  async addReview(req: Request, res: Response) {
    try {
      // const validation = validationResult(req).array();
      // if (validation.length > 0) {
      //   return sendResponse(
      //     res,
      //     HTTP_STATUS.UNPROCESSABLE_ENTITY,
      //     "Failed to add the product to cart",
      //     validation
      //   );
      // }

      const authId = req.params.id;
      const userAuth = await AuthModel.find({ _id: authId }).populate(
        "learner"
      );

      console.log("userAuth:", userAuth);

      if (!userAuth) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Learner is not registered"
        );
      }

      const userId = userAuth[0].learner._id;

      console.log("userId", userId);

      const { courseId, review, rating } = req.body;
      console.log(req.body);

      const learner = await LearnerModel.findById({ _id: userId });
      console.log("learner", learner);

      if (!learner) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "learner is not registered"
        );
      }

      const courseReview = await ReviewModel.findOne({ course: courseId });

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Course with this ID doesnt exist"
        );
      }

      if (!courseReview) {
        console.log("Creating new review...");
        const newReview = await ReviewModel.create({
          course: courseId,
          reviews: [{ learner: learner._id, review: review, rating: rating }],
          averageRating: rating,
          totalReviews: 1,
        });

        // const reviewId: any = newReview._id;
        // learner.reviews.push(newReview._id);

        // course.reviews.push(reviewId)
        const courseCollection = await CourseModel.findByIdAndUpdate(
          courseId,
          { reviews: newReview._id },
          { new: true }
        );

        learner.reviews.push(newReview._id);

        await learner.save();
        await courseCollection?.save();

        if (newReview) {
          return sendResponse(
            res,
            HTTP_STATUS.CREATED,
            `Added a review successfully by ${learner.name}`,
            newReview
          );
        }
      }
      console.log("learner id", userId);

      //   const learnerIndex = courseReview?.reviews.findIndex(
      //     (element) => element.learner === userId
      //   );

      //   console.log("learnerIndex", learnerIndex);

      //   if (learnerIndex !== -1) {
      //     return sendResponse(
      //       res,
      //       HTTP_STATUS.CONFLICT,
      //       "You have already reviewed once for the same course"
      //     );
      //   }

      const reviewExists = courseReview?.reviews.filter(
        (element) => String(element.learner) === String(userId)
      );
      console.log("reviewExists", reviewExists);

      // checking if review already exists
      if (reviewExists?.length) {
        return sendResponse(
          res,
          HTTP_STATUS.CONFLICT,
          "You have already reviewed once for the same course"
        );
      }

      if (courseReview) {
        courseReview.reviews.push({
          learner: learner._id,
          review: review,
          rating: rating,
        });
        // cart.total += 1;
        courseReview.totalReviews = courseReview.reviews.length;

        const total = courseReview.reviews.reduce((acc, curr) => {
          return acc + Number(curr.rating);
        }, 0);

        courseReview.averageRating = total / courseReview.reviews.length;

        learner.reviews.push(courseReview._id);

        // const reviewId: any = courseReview._id;

        // course.reviews.push(reviewId);

        // await course.save();
        await courseReview.save();
        await learner.save();

        console.log("courseReview", courseReview);

        return sendResponse(
          res,
          HTTP_STATUS.CREATED,
          `Added review to existing review list for ${learner.name}`,
          courseReview
        );
      }
    } catch (error) {
      console.log("error at 402", error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "internal server error"
      );
    }
  }

  async updateReview(req: Request, res: Response) {
    try {
      // const validation = validationResult(req).array();
      // if (validation.length > 0) {
      //   return sendResponse(
      //     res,
      //     HTTP_STATUS.UNPROCESSABLE_ENTITY,
      //     "Failed to add the product to cart",
      //     validation
      //   );
      // }

      const authId = req.params.id;
      const userAuth = await AuthModel.find({ _id: authId }).populate(
        "learner"
      );

      console.log("userAuth:", userAuth);

      if (!userAuth) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Learner is not registered"
        );
      }

      const userId = userAuth[0].learner._id;

      console.log("userId", userId);

      const { courseId, review, rating } = req.body;
      console.log(req.body);

      const learner = await LearnerModel.findById({ _id: userId });
      console.log("learner", learner);

      if (!learner) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "learner is not registered"
        );
      }

      const updatedItem = await ReviewModel.findOneAndUpdate(
        { course: courseId, "reviews.learner": userId },
        { $set: { "reviews.$.review": review, "reviews.$.rating": rating } },
        { new: true }
      );

      console.log("updated item", updatedItem);

      if (!updatedItem) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Course not found. Review couldnt be updated"
        );
      }

      console.log("learner id", userId);

      const courseReview = await ReviewModel.findOne({ course: courseId });

      if (courseReview) {
        const total = courseReview.reviews.reduce((acc, curr) => {
          return acc + Number(curr.rating);
        }, 0);

        courseReview.averageRating = total / courseReview.reviews.length;
        await courseReview.save();
        // await learner.save();
        console.log("courseReview", courseReview);

        return sendResponse(
          res,
          HTTP_STATUS.CREATED,
          `updated review successfully ${learner.name}`,
          courseReview
        );
      }
    } catch (error) {
      console.log("error at 402", error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "internal server error"
      );
    }
  }

  async deleteReview(req: Request, res: Response) {
    try {
      // const validation = validationResult(req).array();
      // if (validation.length > 0) {
      //   return sendResponse(
      //     res,
      //     HTTP_STATUS.UNPROCESSABLE_ENTITY,
      //     "Failed to add the product to cart",
      //     validation
      //   );
      // }

      const authId = req.params.id;

      const userAuth = await AuthModel.find({ _id: authId }).populate("user");

      if (!userAuth) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Learner is not registered"
        );
      }

      const learnerId = userAuth[0].learner._id;

      const { courseId } = req.body;

      const deletedItem = await ReviewModel.findOneAndUpdate(
        { course: courseId, "reviews.learner": learnerId },
        { $pull: { reviews: { learner: learnerId } } },
        { new: true }
      );

      console.log("deleted review", deletedItem);

      if (!deletedItem) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Review not found");
      }

      const courseReview = await ReviewModel.findOne({ course: courseId });

      if (courseReview && !courseReview?.reviews.length) {
        courseReview.averageRating = 0;
        courseReview.totalReviews = 0;
        await courseReview?.save();
        return sendResponse(
          res,
          HTTP_STATUS.ACCEPTED,
          `Review deleted successfully`,
          courseReview
        );
      }

      if (courseReview) {
        const total = courseReview.reviews.reduce((acc, curr) => {
          return acc + Number(curr.rating);
        }, 0);

        const average = total / courseReview.reviews.length;

        courseReview.averageRating = average;

        await courseReview.save();

        const productReviewObj = courseReview.toObject();
        // delete productReviewObj?.__v;

        return sendResponse(
          res,
          HTTP_STATUS.ACCEPTED,
          `Review deleted successfully`,
          productReviewObj
        );
      }
    } catch (error) {
      console.log("error at 402", error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "internal server error"
      );
    }
  }
}

export default new ReviewController();
