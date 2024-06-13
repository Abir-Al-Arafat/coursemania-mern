import { NextFunction, Request, Response } from "express";
import HTTP_STATUS from "../constants/statusCodes.ts";
import sendResponse from "../util/common.ts";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

interface ITokenPayload extends JwtPayload {
    _id: string;
    user: {
        _id: string;
    };
    role: string;
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized access");
        }
        const jwt = authorization.split(" ")[1];
        const validate = jsonwebtoken.verify(jwt, process.env.SECRET_KEY ?? "") as ITokenPayload;

        if (validate) {
            req.body.authId = validate._id;
            if (validate.instructor) {
                req.body.role = "instructor";
                req.body.userId = validate.instructor._id;
            } else if (validate.learner) {
                req.body.role = "learner";
                req.body.userId = validate.learner._id;
            } else if (validate.admin) {
                req.body.role = "admin";
                req.body.userId = validate.admin._id;
            }

            next();
        } else {
            throw new Error("Unable to verify token at this time");
        }
    } catch (error) {
        console.log(error);
        if (error instanceof jsonwebtoken.TokenExpiredError) {
            return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Please log in again");
        } else if (error instanceof jsonwebtoken.JsonWebTokenError) {
            return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Token malformed or invalid");
        } else {
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Something went wrong");
        }
    }
};

export const isLearner = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.role === "learner") {
            next();
        } else {
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "User is not an learner");
        }
    } catch (error) {
        console.log(error);
        return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Something went wrong");
    }
};

export const isInstructor = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.role === "instructor") {
            next();
        } else {
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "User is not an instructor");
        }
    } catch (error) {
        console.log(error);
        return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Something went wrong");
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized access");
        }
        const jwt = authorization.split(" ")[1];
        const validate = jsonwebtoken.decode(jwt) as ITokenPayload;
        console.log(validate);
        if (validate.role === "administrator") {
            next();
        } else {
            return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized access");
        }
    } catch (error) {
        console.log(error);
        return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Something went wrong");
    }
};

export const generateRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized access");
        }
        const jwt = req.headers.authorization.split(" ")[1];
        if (process.env.SECRET_KEY) {
            const validate = jsonwebtoken.verify(jwt, process.env.SECRET_KEY);
            console.log("validate", validate);

            return sendResponse(res, HTTP_STATUS.OK, "JWT token is valid");
        } else {
            return sendResponse(res, HTTP_STATUS.NOT_IMPLEMENTED, "Inaccessible functionality");
        }
    } catch (error) {
        console.log(error);
        if (error instanceof jsonwebtoken.TokenExpiredError) {
            next();
        } else if (error instanceof jsonwebtoken.JsonWebTokenError) {
            return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Token malformed or invalid");
        } else {
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Something went wrong");
        }
    }
};
