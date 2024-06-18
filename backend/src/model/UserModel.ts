import { Schema, model, Types } from "mongoose";
// const mongoose = require("mongoose");

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    gender: "male" | "female" | "other";
    address: {
        // house?: string;
        // road?: string;
        // area: string;
        city: string;
        country: string;
    };
    verified: boolean;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
        },
        address: {
            // house: {
            //   type: String,
            //   required: false,
            // },
            // road: {
            //   type: String,
            //   required: false,
            // },
            // area: {
            //   type: String,
            //   required: false,
            // },
            city: {
                type: String,
                required: false,
            },
            country: {
                type: String,
                required: false,
            },
        },
    },
    { timestamps: true }
);

const UserModel = model<IUser>("User", userSchema);
export default UserModel;
