import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { validationResult, ValidationError } from "express-validator";
import HTTP_STATUS from "../constants/statusCodes.ts";
import bcrypt from "bcrypt";
import AuthModel from "../model/AuthModel.ts";
import UserModel from "../model/UserModel.ts";
import LearnerModel from "../model/LearnerModel.ts";
import InstructorModel from "../model/InstructorModel.ts";
import AdminModel from "../model/AdminModel.ts";
import jsonwebtoken from "jsonwebtoken";
import sendResponse from "../util/common.ts";
import { Schema, Types, model } from "mongoose";
import { IUser } from "../model/UserModel";
import { IAuthResponse } from "../interfaces/response";
import AuthRepository from "../repository/Auth/index.ts";

// interface IAuthResponse {
//   _id: Types.ObjectId;
//   email: string;
//   //   password: string;
//   role: "learner" | "instructor" | "admin";
//   token: string;
//   verified: boolean;
//   user: Types.ObjectId | IUser;
//   refreshToken: string;
// }

class AuthController {
    async login(req: any, res: Response, next: NextFunction) {
        try {
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to log in", validation);
            }
            const { email, password } = req.body;
            const auth = await AuthModel.findOne({ email: email })
                .populate("user", "-createdAt -email -updatedAt -__v -address")
                .select("-createdAt -updatedAt -__v");

            if (!auth) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "User is not registered");
            }
            const checkPassword = await bcrypt.compare(password, auth.password);

            if (!checkPassword) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
            }

            const jwtPayload = {
                _id: auth._id,
                email: auth.email,
                user: auth.user,
                role: auth.role,
            };

            if (!process.env.SECRET_KEY || !process.env.JWT_EXPIRE) {
                return sendResponse(res, HTTP_STATUS.NOT_IMPLEMENTED, "Inaccessible functionality");
            }

            const token = jsonwebtoken.sign(jwtPayload, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            const refreshToken = jsonwebtoken.sign(jwtPayload, process.env.SECRET_KEY, {
                expiresIn: process.env.REFRESH_EXPIRE,
            });

            const responseAuth = {
                _id: auth._id,
                email: auth.email,
                role: auth.role,
                verified: auth.verified,
                user: auth.user,
                learner: auth.learner,
                refreshToken: refreshToken,
                token: token,
            };

            auth.refreshToken = refreshToken;
            auth.save();

            return sendResponse(res, HTTP_STATUS.OK, "Successfully logged in", responseAuth);
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    async loginLearner(req: any, res: Response, next: NextFunction) {
        try {
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to log in", validation);
            }
            const { email, password } = req.body;
            const auth = await AuthModel.findOne({ email: email })
                .populate("learner", "-createdAt -email -updatedAt -__v -address")
                .select("-createdAt -updatedAt -__v");

            if (!auth || !auth.learner) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Learner is not registered");
            }
            const checkPassword = await bcrypt.compare(password, auth.password);

            if (!checkPassword) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
            }

            const jwtPayload = {
                _id: auth._id,
                email: auth.email,
                learner: auth.learner,
                role: auth.role,
            };

            if (!process.env.SECRET_KEY || !process.env.JWT_EXPIRE) {
                return sendResponse(res, HTTP_STATUS.NOT_IMPLEMENTED, "Inaccessible functionality");
            }

            const token = jsonwebtoken.sign(jwtPayload, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            const refreshToken = jsonwebtoken.sign(jwtPayload, process.env.SECRET_KEY, {
                expiresIn: process.env.REFRESH_EXPIRE,
            });

            const responseAuth = {
                _id: auth._id,
                email: auth.email,
                role: auth.role,
                verified: auth.verified,
                learner: auth.learner,
                refreshToken: refreshToken,
                token: token,
            };

            auth.refreshToken = refreshToken;
            auth.save();

            return sendResponse(res, HTTP_STATUS.OK, "Successfully logged in as a learner", responseAuth);
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    async loginInstructor(req: any, res: Response, next: NextFunction) {
        try {
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to log in", validation);
            }
            const { email, password } = req.body;
            const auth = await AuthModel.findOne({ email: email })
                .populate("instructor", "-createdAt -email -updatedAt -__v -address")
                .select("-createdAt -updatedAt -__v");

            console.log("auth", auth?.instructor);

            if (!auth || !auth?.instructor) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Instructor is not registered");
            }
            const checkPassword = await bcrypt.compare(password, auth.password);

            if (!checkPassword) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
            }

            const jwtPayload = {
                _id: auth._id,
                email: auth.email,
                instructor: auth.instructor,
                role: auth.role,
            };

            if (!process.env.SECRET_KEY || !process.env.JWT_EXPIRE) {
                return sendResponse(res, HTTP_STATUS.NOT_IMPLEMENTED, "Inaccessible functionality");
            }

            const token = jsonwebtoken.sign(jwtPayload, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            const refreshToken = jsonwebtoken.sign(jwtPayload, process.env.SECRET_KEY, {
                expiresIn: process.env.REFRESH_EXPIRE,
            });

            const responseAuth = {
                _id: auth._id,
                email: auth.email,
                role: auth.role,
                verified: auth.verified,
                instructor: auth.instructor,
                refreshToken: refreshToken,
                token: token,
            };

            auth.refreshToken = refreshToken;
            auth.save();

            return sendResponse(res, HTTP_STATUS.OK, "Successfully logged in as an instructor", responseAuth);
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    async loginAdmin(req: any, res: Response, next: NextFunction) {
        try {
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to log in", validation);
            }
            const { email, password } = req.body;
            const auth = await AuthModel.findOne({ email: email })
                .populate("admin", "-createdAt -email -updatedAt -__v -address")
                .select("-createdAt -updatedAt -__v");

            console.log("auth", auth?.admin);

            if (!auth || !auth?.admin) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Admin is not registered");
            }
            const checkPassword = await bcrypt.compare(password, auth.password);

            if (!checkPassword) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
            }

            const jwtPayload = {
                _id: auth._id,
                email: auth.email,
                admin: auth.admin,
                role: auth.role,
            };

            if (!process.env.SECRET_KEY || !process.env.JWT_EXPIRE) {
                return sendResponse(res, HTTP_STATUS.NOT_IMPLEMENTED, "Inaccessible functionality");
            }

            const token = jsonwebtoken.sign(jwtPayload, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            const refreshToken = jsonwebtoken.sign(jwtPayload, process.env.SECRET_KEY, {
                expiresIn: process.env.REFRESH_EXPIRE,
            });

            const responseAuth = {
                _id: auth._id,
                email: auth.email,
                role: auth.role,
                verified: auth.verified,
                admin: auth.admin,
                refreshToken: refreshToken,
                token: token,
            };

            auth.refreshToken = refreshToken;
            auth.save();

            return sendResponse(res, HTTP_STATUS.OK, "Successfully logged in as an admin", responseAuth);
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    async signup(req: Request, res: Response) {
        try {
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to add the user", validation);
            }
            const { name, email, password, phone, address, role } = req.body;
            const existingAuth = await AuthModel.findOne({ email: email });
            if (existingAuth) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Email is already registered");
            }

            const hashedPassword = await bcrypt.hash(password, 10).then((hash) => {
                return hash;
            });
            const user = await UserModel.create({
                name: name,
                email: email,
                phone: phone,
                address: address,
            });
            const auth = await AuthModel.create({
                email: email,
                password: hashedPassword,
                user: user._id,
                verified: false,
            });
            if (!auth) {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to add the user");
            }

            if (!process.env.SECRET_KEY || !process.env.JWT_EXPIRE) {
                return sendResponse(
                    res,
                    HTTP_STATUS.NOT_IMPLEMENTED,
                    "Server is not able to process this at this time"
                );
            }
            const jwtPayload = {
                _id: auth._id,
                email: auth.email,
                user: auth.user,
                role: auth.role,
            };
            const jwt = jsonwebtoken.sign(jwtPayload, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            const response = {
                _id: auth._id,
                email: auth.email,
                role: auth.role,
                verified: role.verified,
                user: user,
                token: jwt,
                refreshToken: auth.refreshToken,
            };
            response.user = user;

            return sendResponse(res, HTTP_STATUS.OK, "Successfully signed up", response);
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    async signupLearner(req: Request, res: Response) {
        try {
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to add the user", validation);
            }
            const { name, email, password, phone, address, role } = req.body;
            const existingAuth = await AuthModel.findOne({ email: email });
            if (existingAuth) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Email is already registered");
            }

            const hashedPassword = await bcrypt.hash(password, 10).then((hash) => {
                return hash;
            });

            const user = await UserModel.create({
                name: name,
                email: email,
                phone: phone,
                address: address,
            });

            const learner = await LearnerModel.create({
                name: name,
                email: email,
                phone: phone,
                address: address,
            });

            const auth = await AuthModel.create({
                email: email,
                password: hashedPassword,
                user: user._id,
                learner: learner._id,
                role: "learner",
                verified: false,
            });
            if (!auth) {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to add the user");
            }

            if (!process.env.SECRET_KEY || !process.env.JWT_EXPIRE) {
                return sendResponse(
                    res,
                    HTTP_STATUS.NOT_IMPLEMENTED,
                    "Server is not able to process this at this time"
                );
            }
            const jwtPayload = {
                _id: auth._id,
                email: auth.email,
                user: auth.user,
                learner: auth.learner,
                role: auth.role,
            };
            const jwt = jsonwebtoken.sign(jwtPayload, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            const response = {
                _id: auth._id,
                email: auth.email,
                role: auth.role,
                verified: role.verified,
                user: user,
                learner: learner,
                token: jwt,
                refreshToken: auth.refreshToken,
            };
            response.user = user;

            return sendResponse(res, HTTP_STATUS.OK, "Successfully signed up", response);
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    async signupInstructor(req: Request, res: Response) {
        try {
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to add the user", validation);
            }
            const { name, email, password, phone, location, role } = req.body;
            const existingAuth = await AuthModel.findOne({ email: email });
            if (existingAuth) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Email is already registered");
            }

            const hashedPassword = await bcrypt.hash(password, 10).then((hash) => {
                return hash;
            });

            if (!location && location.city === "" && location.country === "") {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Location is not valid");
            }

            const instructor = await InstructorModel.create({
                name: name,
                email: email,
                phone: phone,
                location: location,
            });

            const auth = await AuthModel.create({
                email: email,
                password: hashedPassword,
                instructor: instructor._id,
                role: "instructor",
                verified: false,
            });
            if (!auth) {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to add the user");
            }

            if (!process.env.SECRET_KEY || !process.env.JWT_EXPIRE) {
                return sendResponse(
                    res,
                    HTTP_STATUS.NOT_IMPLEMENTED,
                    "Server is not able to process this at this time"
                );
            }
            const jwtPayload = {
                _id: auth._id,
                email: auth.email,
                user: auth.user,
                instructor: auth.instructor,
                role: auth.role,
            };
            const jwt = jsonwebtoken.sign(jwtPayload, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            const response = {
                _id: auth._id,
                email: auth.email,
                role: auth.role,
                verified: role.verified,
                instructor: instructor,
                token: jwt,
                refreshToken: auth.refreshToken,
            };
            return sendResponse(res, HTTP_STATUS.OK, "Successfully signed up as an instructor", response);
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    async signupAdmin(req: Request, res: Response) {
        try {
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to add the admin", validation);
            }
            const { name, email, password, phone, address, role } = req.body;
            const existingAuth = await AuthModel.findOne({ email: email });
            if (existingAuth) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Email is already registered");
            }

            const hashedPassword = await bcrypt.hash(password, 10).then((hash) => {
                return hash;
            });
            const user = await UserModel.create({
                name: name,
                email: email,
                phone: phone,
                address: address,
            });

            const admin = await AdminModel.create({
                name: name,
                email: email,
                phone: phone,
                address: address,
            });

            const auth = await AuthModel.create({
                email: email,
                password: hashedPassword,
                user: user._id,
                admin: admin._id,
                role: "admin",
                verified: false,
            });
            if (!auth) {
                return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Failed to add the admin");
            }

            if (!process.env.SECRET_KEY || !process.env.JWT_EXPIRE) {
                return sendResponse(
                    res,
                    HTTP_STATUS.NOT_IMPLEMENTED,
                    "Server is not able to process this at this time"
                );
            }
            const jwtPayload = {
                _id: auth._id,
                email: auth.email,
                user: auth.user,
                admin: auth.admin,
                role: auth.role,
            };
            const jwt = jsonwebtoken.sign(jwtPayload, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            const response = {
                _id: auth._id,
                email: auth.email,
                role: auth.role,
                verified: role.verified,
                user: user,
                admin: admin,
                token: jwt,
                refreshToken: auth.refreshToken,
            };
            response.user = user;

            return sendResponse(res, HTTP_STATUS.OK, "Successfully signed up as an admin", response);
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    async refresh(req: Request, res: Response) {
        try {
            const { refreshToken } = req.body;
            const auth = await AuthModel.findOne({ refreshToken: refreshToken }).populate("user").select("-password");

            if (!auth) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "User not found");
            }

            if (!process.env.SECRET_KEY) {
                return sendResponse(
                    res,
                    HTTP_STATUS.NOT_IMPLEMENTED,
                    "Server is not able to process this at this time"
                );
            }

            const refreshTokenValid = jsonwebtoken.verify(refreshToken, process.env.SECRET_KEY);
            if (refreshTokenValid) {
                const authResponse: IAuthResponse = auth.toJSON();
                const jwtPayload = {
                    _id: auth._id,
                    email: auth.email,
                    user: auth.user._id,
                    role: auth.role,
                };
                const jwt = jsonwebtoken.sign(jwtPayload, process.env.SECRET_KEY, {
                    expiresIn: process.env.JWT_EXPIRE,
                });

                authResponse.token = jwt;
                return sendResponse(res, HTTP_STATUS.OK, "Successfully refreshed token", authResponse);
            }
        } catch (error) {
            console.log(error);
            if (error instanceof jsonwebtoken.TokenExpiredError) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Please log in again");
            } else if (error instanceof jsonwebtoken.JsonWebTokenError) {
                return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Token malformed or invalid");
            } else {
                return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
            }
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            // const {
            //   sortParam,
            //   sortOrder,
            //   search,
            //   name,
            //   author,
            //   price,
            //   priceFil,
            //   stock,
            //   stockFil,
            //   page,
            //   limit,
            // } = req.query;
            // if (page < 1 || limit < 0) {
            //   return res
            //     .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
            //     .send(failure("Page and limit values must be at least 1"));
            // }
            // if (
            //   (sortOrder && !sortParam) ||
            //   (!sortOrder && sortParam) ||
            //   (sortParam &&
            //     sortParam !== "stock" &&
            //     sortParam !== "price" &&
            //     sortParam !== "name") ||
            //   (sortOrder && sortOrder !== "asc" && sortOrder !== "desc")
            // ) {
            //   return res
            //     .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
            //     .send(failure("Invalid sort parameters provided"));
            // }
            // const filter = {};

            // if (price && priceFil) {
            //   if (priceFil === "low") {
            //     filter.price = { $lte: parseFloat(price) };
            //   } else {
            //     filter.price = { $gte: parseFloat(price) };
            //   }
            // }
            // if (stock && stockFil) {
            //   if (stockFil === "low") {
            //     filter.stock = { $lte: parseFloat(stock) };
            //   } else {
            //     filter.stock = { $gte: parseFloat(stock) };
            //   }
            // }

            // if (name) {
            //   filter.name = { $regex: name, $options: "i" };
            // }
            // if (author) {
            //   filter.author = { $in: author.toLowerCase() };
            // }
            // if (search) {
            //   filter["$or"] = [
            //     { name: { $regex: search, $options: "i" } },
            //     { author: { $regex: search, $options: "i" } },
            //   ];
            // }
            // console.log(filter.$or);
            // console.log(typeof Object.keys(JSON.parse(JSON.stringify(filter)))[0]);
            // const productCount = await ProductModel.find({}).count();
            // const products = await ProductModel.find(filter)
            //   .sort({
            //     [sortParam]: sortOrder === "asc" ? 1 : -1,
            //   })
            //   .skip((page - 1) * limit)
            //   .limit(limit ? limit : 10);
            // // console.log(products)
            // if (products.length === 0) {
            //   return res.status(HTTP_STATUS.OK).send(
            //     success("No products were found", {
            //       total: productCount,
            //       totalPages: null,
            //       count: 0,
            //       page: 0,
            //       limit: 0,
            //       products: [],
            //     })
            //   );
            // }

            const { users, userCount } = await AuthRepository.getAllUsers();

            // console.log(courses);
            if (users) {
                return sendResponse(res, HTTP_STATUS.OK, "Successfully got all the users", {
                    totalUsers: userCount,
                    // count: products.length,
                    // page: parseInt(page),
                    // limit: parseInt(limit),
                    users: users,
                });
            } else {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No quizzes found");
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    async getAllLearners(req: Request, res: Response) {
        try {
            // const {
            //   sortParam,
            //   sortOrder,
            //   search,
            //   name,
            //   author,
            //   price,
            //   priceFil,
            //   stock,
            //   stockFil,
            //   page,
            //   limit,
            // } = req.query;
            // if (page < 1 || limit < 0) {
            //   return res
            //     .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
            //     .send(failure("Page and limit values must be at least 1"));
            // }
            // if (
            //   (sortOrder && !sortParam) ||
            //   (!sortOrder && sortParam) ||
            //   (sortParam &&
            //     sortParam !== "stock" &&
            //     sortParam !== "price" &&
            //     sortParam !== "name") ||
            //   (sortOrder && sortOrder !== "asc" && sortOrder !== "desc")
            // ) {
            //   return res
            //     .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
            //     .send(failure("Invalid sort parameters provided"));
            // }
            // const filter = {};

            // if (price && priceFil) {
            //   if (priceFil === "low") {
            //     filter.price = { $lte: parseFloat(price) };
            //   } else {
            //     filter.price = { $gte: parseFloat(price) };
            //   }
            // }
            // if (stock && stockFil) {
            //   if (stockFil === "low") {
            //     filter.stock = { $lte: parseFloat(stock) };
            //   } else {
            //     filter.stock = { $gte: parseFloat(stock) };
            //   }
            // }

            // if (name) {
            //   filter.name = { $regex: name, $options: "i" };
            // }
            // if (author) {
            //   filter.author = { $in: author.toLowerCase() };
            // }
            // if (search) {
            //   filter["$or"] = [
            //     { name: { $regex: search, $options: "i" } },
            //     { author: { $regex: search, $options: "i" } },
            //   ];
            // }
            // console.log(filter.$or);
            // console.log(typeof Object.keys(JSON.parse(JSON.stringify(filter)))[0]);
            // const productCount = await ProductModel.find({}).count();
            // const products = await ProductModel.find(filter)
            //   .sort({
            //     [sortParam]: sortOrder === "asc" ? 1 : -1,
            //   })
            //   .skip((page - 1) * limit)
            //   .limit(limit ? limit : 10);
            // // console.log(products)
            // if (products.length === 0) {
            //   return res.status(HTTP_STATUS.OK).send(
            //     success("No products were found", {
            //       total: productCount,
            //       totalPages: null,
            //       count: 0,
            //       page: 0,
            //       limit: 0,
            //       products: [],
            //     })
            //   );
            // }

            const { learners, learnersCount } = await AuthRepository.getAllLearners();

            // console.log(courses);
            if (learners) {
                return sendResponse(res, HTTP_STATUS.OK, "Successfully got all the learners", {
                    totalLearners: learnersCount,
                    // count: products.length,
                    // page: parseInt(page),
                    // limit: parseInt(limit),
                    learners: learners,
                });
            } else {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No learners found");
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    async getAllInstructors(req: Request, res: Response) {
        try {
            // const {
            //   sortParam,
            //   sortOrder,
            //   search,
            //   name,
            //   author,
            //   price,
            //   priceFil,
            //   stock,
            //   stockFil,
            //   page,
            //   limit,
            // } = req.query;
            // if (page < 1 || limit < 0) {
            //   return res
            //     .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
            //     .send(failure("Page and limit values must be at least 1"));
            // }
            // if (
            //   (sortOrder && !sortParam) ||
            //   (!sortOrder && sortParam) ||
            //   (sortParam &&
            //     sortParam !== "stock" &&
            //     sortParam !== "price" &&
            //     sortParam !== "name") ||
            //   (sortOrder && sortOrder !== "asc" && sortOrder !== "desc")
            // ) {
            //   return res
            //     .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
            //     .send(failure("Invalid sort parameters provided"));
            // }
            // const filter = {};

            // if (price && priceFil) {
            //   if (priceFil === "low") {
            //     filter.price = { $lte: parseFloat(price) };
            //   } else {
            //     filter.price = { $gte: parseFloat(price) };
            //   }
            // }
            // if (stock && stockFil) {
            //   if (stockFil === "low") {
            //     filter.stock = { $lte: parseFloat(stock) };
            //   } else {
            //     filter.stock = { $gte: parseFloat(stock) };
            //   }
            // }

            // if (name) {
            //   filter.name = { $regex: name, $options: "i" };
            // }
            // if (author) {
            //   filter.author = { $in: author.toLowerCase() };
            // }
            // if (search) {
            //   filter["$or"] = [
            //     { name: { $regex: search, $options: "i" } },
            //     { author: { $regex: search, $options: "i" } },
            //   ];
            // }
            // console.log(filter.$or);
            // console.log(typeof Object.keys(JSON.parse(JSON.stringify(filter)))[0]);
            // const productCount = await ProductModel.find({}).count();
            // const products = await ProductModel.find(filter)
            //   .sort({
            //     [sortParam]: sortOrder === "asc" ? 1 : -1,
            //   })
            //   .skip((page - 1) * limit)
            //   .limit(limit ? limit : 10);
            // // console.log(products)
            // if (products.length === 0) {
            //   return res.status(HTTP_STATUS.OK).send(
            //     success("No products were found", {
            //       total: productCount,
            //       totalPages: null,
            //       count: 0,
            //       page: 0,
            //       limit: 0,
            //       products: [],
            //     })
            //   );
            // }

            const { instructors, instructorsCount } = await AuthRepository.getAllInstructors();

            // console.log(courses);
            if (instructors) {
                return sendResponse(res, HTTP_STATUS.OK, "Successfully got all the instructors", {
                    totalInstructors: instructorsCount,
                    // count: products.length,
                    // page: parseInt(page),
                    // limit: parseInt(limit),
                    instructors: instructors,
                });
            } else {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No instructors found");
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    async getOneById(req: Request, res: Response) {
        try {
            const validation: ValidationError[] = validationResult(req).array();
            // console.log(validation);
            if (validation.length > 0) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to get the user", validation[0].msg);
            }

            const { id } = req.params;

            const user = await AuthRepository.getOne(new mongoose.Types.ObjectId(id));

            if (user.length) {
                return sendResponse(res, HTTP_STATUS.OK, "Successfully got the user", user);
            }
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "user with this ID doesnt exist");
        } catch (error) {
            console.log("error", error);
            return sendResponse(res, HTTP_STATUS.BAD_REQUEST, "internal server error");
        }
    }
}

// const _AuthController_ = new AuthController();
// export default _AuthController_;
export default new AuthController();
