import { Document, Schema, model, Types } from "mongoose";
import { ILearner } from "./LearnerModel.ts";
import { CourseItem } from "./CartModel.ts"

interface IWishlist {
  learner: Types.ObjectId | ILearner;
  courses: CourseItem[];
  // courses: Types.ObjectId[];
  total: number;
}

interface CartDocument extends IWishlist, Document {}
// interface CartDocument extends Cart

const wishlistSchema = new Schema<IWishlist>(
  {
    learner: {
      type: Schema.Types.ObjectId,
      ref: "Learner",
      required: true,
    },
    courses: [
      {
        course: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
      },
    ],
    total: { type: Number, required: false },
  },
  { timestamps: true }
);

const WishlistModel = model<IWishlist>("Wishlist", wishlistSchema);

export default WishlistModel;
