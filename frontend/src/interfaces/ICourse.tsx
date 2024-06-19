import { ObjectId } from "mongoose";

interface Chapter {
  _id: ObjectId;
  name: string;
}

interface Student {
  _id: ObjectId;
  name: string;
}

interface Instructor {
  _id: ObjectId;
  name: string;
}

interface Review {
  _id: ObjectId;
  // Add properties relevant to reviews
}

export interface ICourse {
  _id: ObjectId;
  title: string;
  category: string;
  chapters: Chapter[];
  students: Student[];
  instructors: Instructor[];
  description: string;
  releaseDate?: Date;
  img?: string;
  reviews?: Review[];
}
