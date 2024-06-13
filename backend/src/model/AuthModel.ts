import { Schema, Types, model } from "mongoose";
// const bcrypt = require("bcryptjs");
import { IUser } from "./UserModel";
import { ILearner } from "./LearnerModel";
import { IInstructor } from "./InstructorModel";
import { IAdmin } from "./AdminModel";

export interface IAuth {
    _id: Types.ObjectId;
    email: string;
    password: string;
    role: "learner" | "instructor" | "admin";
    verified: boolean;
    user: Types.ObjectId | IUser;
    learner: Types.ObjectId | ILearner;
    instructor: Types.ObjectId | IInstructor;
    admin: Types.ObjectId | IAdmin;
    refreshToken: string;
    wrongAttempts: Number;
    isLocked: boolean;
    lockedTill: Date;
    resetPassword: boolean;
    resetPasswordToken: string | null;
    resetPasswordExpire: Date | null;
}

const authSchema = new Schema<IAuth>(
    {
        email: {
            type: String,
            required: [true, "please provide email"],
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: 5,
            //   select: false,
        },

        role: {
            type: String,
            enum: ["learner", "instructor", "admin"],
            // default: "user",
        },

        verified: {
            type: Boolean,
            required: false,
            default: false,
        },

        wrongAttempts: {
            type: Number,
            required: false,
            default: 0,
        },

        isLocked: {
            type: Boolean,
            required: false,
            default: false,
        },

        lockedTill: {
            type: Date,
            required: false,
            default: 0,
        },

        user: {
            type: Types.ObjectId,
            ref: "User",
            // required: true,
        },

        admin: {
            type: Types.ObjectId,
            ref: "Admin",
            // required: true,
        },

        learner: {
            type: Types.ObjectId,
            ref: "Learner",
            // required: true,
        },

        instructor: {
            type: Types.ObjectId,
            ref: "Instructor",
            // required: true,
        },

        resetPassword: {
            type: Boolean || null,
            required: false,
            default: false,
        },

        resetPasswordToken: {
            type: String || null,
            required: false,
            default: null,
        },

        resetPasswordExpire: {
            type: Date || null,
            required: false,
            default: null,
        },
    },
    { timestamps: true }
);

const AuthModel = model<IAuth>("Auth", authSchema);

export default AuthModel;
