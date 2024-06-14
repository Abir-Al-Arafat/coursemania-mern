import { Document, Schema, model, Types } from "mongoose";

export interface IReviewItem {
  learner: Types.ObjectId;
  review: string;
  rating: number;
}

export interface IReview {
  course: Types.ObjectId;
  reviews: IReviewItem[];
  averageRating?: number;
  totalReviews: Number;
}

const reviewSchema = new Schema<IReview>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  reviews: [
    {
      learner: {
        type: Schema.Types.ObjectId,
        ref: "Learner",
        required: true,
      },
      review: String,
      rating: Number,
    },
  ],
  averageRating: Number,
  totalReviews: Number,
});

const ReviewModel = model<IReview>("Review", reviewSchema);

export default ReviewModel;
