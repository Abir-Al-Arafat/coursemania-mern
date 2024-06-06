import express, { Request, Response } from "express";
import HTTP_STATUS from "./constants/statusCodes.ts";
import databaseConnection from "./config/database.ts";
import dotenv from "dotenv";

import CourseRouter from "./routes/CourseRoutes.ts";
import ChapterRouter from "./routes/ChapterRoutes.ts";
import AuthRouter from "./routes/AuthRoutes.ts";
import CartRouter from "./routes/CartRoutes.ts";
import QuizRouter from "./routes/QuizRoutes.ts";
import AssignmentRouter from "./routes/AssignmentRoutes.ts";
import SubchapterRouter from "./routes/SubchapterRoutes.ts";
import WishlistRouter from "./routes/WishlistRoutes.ts";
import ReviewRouter from "./routes/ReviewRoutes.ts";

const app = express();
dotenv.config();

app.use(express.json()); // Parses data as JSON
app.use(express.text()); // Parses data as text
// app.use(express.urlencoded({ extended: true })); // Parses data as urlencoded

const prefix: string = "/api";

app.use(`${prefix}/courses`, CourseRouter);
app.use(`${prefix}/courses/chapters`, ChapterRouter);
app.use(`${prefix}/auth`, AuthRouter);
app.use(`${prefix}/cart`, CartRouter);
app.use(`${prefix}/wishlist`, WishlistRouter);
app.use(`${prefix}/review`, ReviewRouter);
app.use(`${prefix}/quiz`, QuizRouter);
app.use(`${prefix}/assignment`, AssignmentRouter);
app.use(`${prefix}/courses/subchapters`, SubchapterRouter);

app.use((req: Request, res: Response) => {
    return res.status(HTTP_STATUS.BAD_REQUEST).send({ message: "Route doesnt exist" });
});

const PORT = 8000;

databaseConnection(() => {
    app.listen(PORT, () => {
        console.log(`started server at ${PORT}`);
    });
});
