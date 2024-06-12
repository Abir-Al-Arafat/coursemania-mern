import { RequestHandler } from "express";
import { body, param } from "express-validator";
// import { TCourseValidator } from "../interfaces/validators";
import mongoose from "mongoose";

const mongoIDValidator: RequestHandler[] = [
    param("id")
        .exists()
        .withMessage("Product ID must be provided")
        .bail()
        //   .matches(/^[a-f\d]{24}$/i)
        .isMongoId()
        .withMessage("ID is not in valid mongoDB format"),
];

const courseValidator = {
    create: [
        body("title")
            .exists()
            .withMessage("title was not provided")
            .bail()
            .notEmpty()
            .withMessage("title cannot be empty")
            .bail()
            .isString()
            .withMessage("title must be a string"),
        body("category")
            // .optional()
            .exists()
            .withMessage("category was not provided")
            .bail()
            .notEmpty()
            .withMessage("category cannot be empty")
            .bail()
            .isString()
            .withMessage("category must be a string"),
        body("instructors")
            .optional()
            .isArray({ min: 1 })
            .withMessage("Instructor list must be an array")
            .bail()
            .custom((input, meta) => {
                console.log(input);
                input.map((element: string) => {
                    console.log(mongoose.isValidObjectId(element));
                    if (!mongoose.isValidObjectId(element)) {
                        console.log(element);
                        throw new Error("Element in instructors list is not a valid object ID");
                    }
                });
                return true;
            }),
        body("description")
            .exists()
            .withMessage("description was not provided")
            .bail()
            .notEmpty()
            .withMessage("description cannot be empty")
            .bail()
            .isString()
            .withMessage("description must be a string"),
        body("releaseDate")
            .exists()
            .withMessage("releaseDate was not provided")
            .bail()
            .notEmpty()
            .withMessage("releaseDate cannot be empty")
            .bail()
            .isDate({ format: "YYYY-MM-DD" })
            .withMessage("Invalid release date format (YYYY-MM-DD)"),
    ],
    update: [
        // body("name").optional().notEmpty().withMessage("Name is required").bail().isString().withMessage("name must be a string"),
        param("id").isMongoId().withMessage("ID is not in valid format"),
        body("title")
            .optional()
            .isString()
            .withMessage("title must be a string")
            .isLength({ min: 10, max: 50 })
            .withMessage("Title must be between 10 and 50 characters"),
        body("category").optional().isString().withMessage("category must be a string"),
        body("description")
            .optional()
            .isString()
            .withMessage("description must be a string")
            .isLength({ min: 20, max: 2000 })
            .withMessage("Description must be between 20 and 2000 characters"),
        body("releaseDate")
            .optional()
            .notEmpty()
            .withMessage("releaseDate cannot be empty")
            .bail()
            .isDate({ format: "YYYY-MM-DD" })
            .withMessage("Invalid release date format (YYYY-MM-DD)"),
        body("chapters")
            .optional()
            .isArray({ min: 1 })
            .withMessage("A list of chapter IDs were not provided")
            .bail()
            .custom((input, meta) => {
                console.log(input);
                input.map((element: string) => {
                    console.log(mongoose.isValidObjectId(element));
                    if (!mongoose.isValidObjectId(element)) {
                        console.log(element);
                        throw new Error("Element in chapters list is not a valid object ID");
                    }
                });
                // console.log(element);
                return true;
            }),
        body("price")
            .optional()
            .notEmpty()
            .withMessage("price cannot be empty")
            .bail()
            .isFloat({ min: 1, max: 1000 })
            .withMessage("Price must be a positive number"),
        body("stock")
            .optional()
            .notEmpty()
            .withMessage("stock cannot be empty")
            .bail()
            .isInt({ min: 1 })
            .withMessage("Stock must be a non-negative integer"),
    ],
};

const subChapterValidator = [
    body("title")
        .exists()
        .withMessage("title was not provided")
        .bail()
        .notEmpty()
        .withMessage("title cannot be empty")
        .bail()
        .isString()
        .withMessage("title must be a string"),
];

const AuthValidator = {
    login: [
        body("email")
            .exists()
            .withMessage("Email must be provided")
            .bail()
            .notEmpty()
            .withMessage("Email cannot be empty"),
        body("password")
            .exists()
            .withMessage("Password must be provided")
            .bail()
            .notEmpty()
            .withMessage("Password cannot be empty"),
    ],
    signup: [
        body("name")
            .exists()
            .withMessage("Name must be provided")
            .bail()
            .isString()
            .withMessage("Name must be a string")
            .bail()
            .matches(/^[a-zA-Z-. ]*$/)
            .withMessage("Name must be in only alphabets")
            .isLength({ min: 1, max: 100 })
            .withMessage("Name must be between 1 and 100 characters")
            .bail(),
        body("email")
            .exists()
            .withMessage("Email must be provided")
            .bail()
            .isString()
            .withMessage("Email must be a string")
            .bail()
            .isEmail()
            .withMessage("Email must be in valid format"),
        body("password")
            .exists()
            .withMessage("Password must be provided")
            .bail()
            .isString()
            .withMessage("Password must be a string")
            .bail()
            .isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minSymbols: 1,
                minNumbers: 1,
            })
            .withMessage(
                "Password must contain at least 8 characters with 1 lower case, 1 upper case, 1 number, 1 symbol"
            ),
        body("passwordConfirm")
            .exists()
            .withMessage("Password must be provided")
            .bail()
            .isString()
            .withMessage("Password must be a string")
            .bail()
            .custom((value, { req }) => {
                if (value === req.body.password) {
                    return true;
                }
                throw new Error("Passwords do not match");
            }),
        body("phone")
            .exists()
            .withMessage("Phone number must be provided")
            .bail()
            .isString()
            .withMessage("Phone number must be a string")
            .bail()
            .matches(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)
            .withMessage("Phone number must be in a valid format"),
        body("location.city")
            .exists()
            .withMessage("City was not provided")
            .bail()
            .isString()
            .withMessage("City must be a string"),
        body("location.country")
            .exists()
            .withMessage("Country was not provided")
            .bail()
            .isString()
            .withMessage("Country must be a string"),
    ],
};

export { mongoIDValidator, courseValidator, subChapterValidator, AuthValidator };
