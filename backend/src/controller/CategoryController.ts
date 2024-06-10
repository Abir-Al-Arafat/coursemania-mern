import { Request, Response } from "express";
import CategoryModel from "../model/TagModel.ts";
import sendResponse from "../util/common.ts";
import HTTP_STATUS from "../constants/statusCodes.ts";

class TagController {
    async getAll(req: Request, res: Response) {
        try {
            const categories = await CategoryModel.find({});
            // const validation: ValidationError[] = validationResult(req).array();
            // // console.log(validation);
            // if (validation.length > 0) {
            //     return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to get the course", validation[0].msg);
            // }

            // const { id } = req.params;

            // const chapter = await ChapterRepository.getOne(new mongoose.Types.ObjectId(id));

            // if (chapter.length) {
            //     return sendResponse(res, HTTP_STATUS.OK, "Successfully got the chapter", chapter);
            // } else {
            return sendResponse(res, HTTP_STATUS.OK, "Got all categories", categories);
            // }
        } catch (error) {
            console.log("error", error);
            return sendResponse(res, HTTP_STATUS.BAD_REQUEST, "internal server error");
        }
    }
}

export default new TagController();
