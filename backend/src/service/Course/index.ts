import mongoose from "mongoose";
import CourseRepository from "../../repository/Course/index.ts";

export interface IGetAllProps {
    page: number;
    limit: number;
    search?: string;
}

class CourseService {
    async getAll({ page, limit }: IGetAllProps) {
        const { courses, courseCount } = await CourseRepository.getAll(page, limit);
        return { courses, courseCount };
    }

    async getOne(id: mongoose.Types.ObjectId) {
        const course = await CourseRepository.getOne(new mongoose.Types.ObjectId(id));
        return course;
    }

    async add() {}
}

export default new CourseService();
