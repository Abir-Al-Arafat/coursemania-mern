import { Request, Response } from "express";
import { validationResult, ValidationError } from "express-validator";
// import { success, failure } from "../util/common.ts";
import sendResponse from "../util/common.ts";
import HTTP_STATUS from "../constants/statusCodes.ts";
import CartModel from "../model/CartModel.ts";
// import ProductModel from "../model/Product";
import CourseModel from "../model/CourseModel.ts";
// import UserModel from "../model/User";

// import DiscountModel from "../model/Discount";
import AuthModel from "../model/AuthModel.ts";
import LearnerModel from "../model/LearnerModel.ts";
import CartRepository from "../repository/Cart/index.ts";

import { ILearner } from "../model/LearnerModel.ts";
import mongoose, { Types } from "mongoose";

interface Learner {
    cart: any[]; // You can replace 'any' with a specific type if the array has a specific structure
    _id: Types.ObjectId;
    name: string;
    email: string;
    verified: boolean;
    phone: string;
    enrolledCourses: any[]; // Replace 'any' with a specific type if needed
    courseProgress: any[]; // Replace 'any' with a specific type if needed
    wishlist: any[]; // Replace 'any' with a specific type if needed
    reviews: any[]; // Replace 'any' with a specific type if needed
    favourites: any[]; // Replace 'any' with a specific type if needed
    role: "learner"; // Assuming 'role' is always 'learner'
    __v: number;
}

class CartController {
    async getAll(req: Request, res: Response) {
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

            const { carts, cartsCount } = await CartRepository.getAll();

            // console.log(courses);
            if (carts) {
                return sendResponse(res, HTTP_STATUS.OK, "Successfully got all the carts", {
                    total: cartsCount,
                    // count: products.length,
                    // page: parseInt(page),
                    // limit: parseInt(limit),
                    carts: carts,
                });
            } else {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No carts found");
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    // get cart by learner id
    async getCart(req: Request, res: Response) {
        try {
            const authId = req.params.id;

            const userAuth = await AuthModel.find({ _id: authId }).populate("learner");

            if (!userAuth) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Learner is not registered");
            }

            const userId = userAuth[0].learner._id;

            const learner = await LearnerModel.findById({ _id: userId });
            if (!learner) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Learner is not registered");
            }
            const cart = await CartModel.findOne({ learner: userId }).populate("courses.course").populate("learner");
            if (!cart) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Cart does not exist for learner");
            }

            console.log(cart.courses);

            const cartObject = cart.toObject();
            const learnerInfo: ILearner | Object | Learner = cartObject.learner;
            // console.log("cartObject", cart.learner);
            console.log("learnerInfo", learnerInfo);

            // delete cartObject.__v;
            // delete cartObject.learner.__v;

            await cart.save();
            console.log("cart", cart);
            return sendResponse(res, HTTP_STATUS.OK, `Successfully got cart of ${cartObject.learner}`, cartObject);
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    // get cart by cart id
    async getCartByCartId(req: Request, res: Response) {
        try {
            // const validation: ValidationError[] = validationResult(req).array();
            // // console.log(validation);
            // if (validation.length > 0) {
            //   return sendResponse(
            //     res,
            //     HTTP_STATUS.NOT_FOUND,
            //     "Failed to get the course",
            //     validation[0].msg
            //   );
            // }

            const { id } = req.params;

            const cart = await CartRepository.getCartByCartId(new mongoose.Types.ObjectId(id));

            if (cart.length) {
                return sendResponse(res, HTTP_STATUS.OK, "Successfully got the cart", cart);
            } else {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "cart with this ID doesnt exist");
            }
        } catch (error) {
            console.log("error", error);
            return sendResponse(res, HTTP_STATUS.BAD_REQUEST, "internal server error");
        }
    }

    async addProductToCart(req: Request, res: Response) {
        try {
            // const validation = validationResult(req).array();
            // if (validation.length > 0) {
            //   return sendResponse(
            //     res,
            //     HTTP_STATUS.UNPROCESSABLE_ENTITY,
            //     "Failed to add the product to cart",
            //     validation
            //   );
            // }

            const authId = req.params.id;
            const userAuth = await AuthModel.find({ _id: authId }).populate("learner");

            console.log("userAuth:", userAuth);

            if (!userAuth) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Learner is not registered");
            }

            const userId = userAuth[0].learner._id;

            console.log("userId", userId);

            const { courseId } = req.body;
            console.log(req.body);

            const learner = await LearnerModel.findById({ _id: userId });
            console.log("learner", learner);

            if (!learner) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "learner is not registered");
            }

            const cart = await CartModel.findOne({ learner: userId });
            const course = await CourseModel.findById(courseId);

            if (!course) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Course with this ID doesnt exist");
            }

            if (!cart) {
                console.log("Creating new cart...");
                const newCart = await CartModel.create({
                    learner: userId,
                    courses: [{ course: courseId }],
                    total: 1,
                });

                learner.cart = [...newCart.courses];
                await learner.save();
                if (newCart) {
                    return sendResponse(
                        res,
                        HTTP_STATUS.CREATED,
                        `Added item to newly created cart for ${learner.name}`,
                        newCart
                    );
                }
            }

            const productIndex = cart?.courses.findIndex((element) => String(element.course) === courseId);
            if (productIndex !== -1) {
                return sendResponse(res, HTTP_STATUS.CONFLICT, "Course already exists in cart");
            }
            if (cart) {
                cart.courses.push({ course: courseId });
                // cart.total += 1;
                cart.total = cart.courses.length;
                learner.cart = [...cart.courses];
                await cart.save();
                await learner.save();
                return sendResponse(res, HTTP_STATUS.CREATED, `Added item to existing cart for ${learner.name}`, cart);
            }
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal server error");
        }
    }
    async removeProductFromCart(req: Request, res: Response) {
        try {
            // const validation = validationResult(req).array();
            // if (validation.length > 0) {
            //   return sendResponse(
            //     res,
            //     HTTP_STATUS.NOT_FOUND,
            //     "Failed to add the course",
            //     validation[0].msg
            //   );
            // }

            const authId = req.params.id;
            // const userAuth = await AuthModel.find({ _id: authId }).populate("user");

            const userAuth = await AuthModel.find({ _id: authId }).populate("learner");

            if (!userAuth) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Learner is not registered");
            }

            const learnerId = userAuth[0].learner._id;

            const { courseId } = req.body;

            const learner = await LearnerModel.findById({ _id: learnerId });
            console.log("learner", learner);
            console.log("learner cart", learner?.cart);

            if (!learner) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Learner is not registered");
            }

            const cart = await CartModel.findOne({ learner: learnerId });

            console.log("cart", cart);

            if (!cart?.courses.length) {
                return sendResponse(
                    res,
                    HTTP_STATUS.NOT_FOUND,
                    `you dont have any courses in you cart, ${cart?.courses}`
                );
            }

            const courseIndex = cart.courses.findIndex((element) => String(element.course) === courseId);

            if (courseIndex !== -1) {
                const deletedProduct = cart.courses.splice(courseIndex, 1);
                console.log(deletedProduct);
                cart.total = cart.courses.length;
                learner.cart = [...cart.courses];
                await cart.save();
                await learner.save();
                return sendResponse(
                    res,
                    HTTP_STATUS.ACCEPTED,
                    `successfully removed from cart${{ cart, total: cart.total }}`
                );
            } else {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "course not found in cart");
            }
        } catch (error) {
            console.log("error", error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }
}

export default new CartController();
