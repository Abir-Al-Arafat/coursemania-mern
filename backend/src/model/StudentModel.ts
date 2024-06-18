import mongoose, { Document, Schema, Types } from 'mongoose';

interface ILearner extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  verified: boolean;
  phone: string;
  enrolledCourses: string[];
  courseProgress: { courseId: string; progress: number }[];
  wishlist: string[];
  reviews: { courseId: string; rating: number; comment: string }[];
  favourites: string[];
  role: "learner";
}

const studentSchema = new Schema<ILearner>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  verified: { type: Boolean, default: false },
  phone: { type: String, required: true },
  enrolledCourses: { type: [String], default: [] },
  courseProgress: { type: [{ courseId: String, progress: Number }], default: [] },
  wishlist: { type: [String], default: [] },
  reviews: { type: [{ courseId: String, rating: Number, comment: String }], default: [] },
  favourites: { type: [String], default: [] },
  role: { type: String, enum: ["learner", "instructor", "admin"], default: "learner" }
});

const LearnerModel = mongoose.model<ILearner>('Student', studentSchema);

export default LearnerModel;
