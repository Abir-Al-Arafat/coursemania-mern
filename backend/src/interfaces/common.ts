import mongoose, { ObjectId, Types } from "mongoose";

export interface ICourse {
    title: string;
    category: string;
    chapters: Object[];
    students: Object[];
    instructors: Object[];
    tags: string[];
    description: string;
    releaseDate: Date;
    img: string;
    published: "pending" | "abandoned" | "rejected" | "approved";
}

export interface IAssignment {
    title: string;
    description: string;
}

export interface ISubchapter {
    title: string;
    description: string;
    video: string;
    image: string;
    compressed: string;
    pdf: string;
    presentation: string;
    text: string;
    quiz: Types.ObjectId | IQuiz;
    assignment: Types.ObjectId | IAssignment;
}

export interface IQuestion {
    text: string;
    options: {
        _id: number;
        value: string;
    }[];
    correctOptionIndex: number;
}

export interface IQuiz {
    title: string;
    questions: IQuestion[];
    createdBy: Types.ObjectId;
    chapters: Types.ObjectId[];
    courses: Types.ObjectId[];
    isDeleted: boolean;
}
