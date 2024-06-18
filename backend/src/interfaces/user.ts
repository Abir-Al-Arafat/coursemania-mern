import { Types } from "mongoose";

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
