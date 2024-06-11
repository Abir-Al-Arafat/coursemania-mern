import { Request, Response } from "express";
import { FieldValidationError, validationResult } from "express-validator";
import fs from "fs";
import path from "path";

type TResponse = {
    success: boolean;
    message: string;
    error?: null | string;
    data?: any;
};

const sendResponse: (
    res: Response,
    status: number,
    message: string,
    result?: any
) => Response<any, Record<string, any>> = (res, status, message, result = null) => {
    const response: TResponse = { success: false, message: "" };
    if (status >= 400) {
        response.success = false;
        response.error = result;
        response.message = "Internal server error";
    } else {
        response.success = true;
        response.data = result;
        response.message = "Successfully completed operations";
    }

    if (message) {
        response.message = message;
    }
    return res.status(status).send(response);
};

export const checkValidation = (req: Request) => {
    const validation = validationResult(req).array() as FieldValidationError[];
    if (validation.length > 0) {
        return validation.map((element) => {
            return { message: element.msg, field: element.path };
        });
    }
    return [];
};

export const removeFile = (_path_: string[]) => {
    fs.unlink(path.join(path.resolve(path.dirname("")), "server", ..._path_), (err) => {
        console.log(err);
    });
};

export default sendResponse;
