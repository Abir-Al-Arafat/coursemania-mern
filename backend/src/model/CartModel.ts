import { Document, Schema, model, Types } from "mongoose";
import { ILearner } from "./LearnerModel.ts";
export interface CourseItem {
    course: Types.ObjectId;
}
interface Cart {
    learner: Types.ObjectId | ILearner;
    courses: CourseItem[];
    // courses: Types.ObjectId[];
    total: number;
}

interface CartDocument extends Cart, Document {}
// interface CartDocument extends Cart

const cartSchema = new Schema<Cart>(
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
        total: { type: Number, required: true },
    },
    { timestamps: true }
);

const CartModel = model<Cart>("Cart", cartSchema);

export default CartModel;
