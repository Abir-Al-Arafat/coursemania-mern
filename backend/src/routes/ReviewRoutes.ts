import express from "express";
const routes = express();
// const { userValidator, productValidator, cartValidator } = require("../middleware/validation");

// const { isAuthenticated, isAdmin } = require("../middleware/auth");
// const CartController = require("../controller/CartController");

import WishlistController from "../controller/WishlistController.ts";
import ReviewController from "../controller/ReviewController.ts";

// const cartValidator = require("../middleware/cartValidation");
// const { isAuthorizedUser } = require("../middleware/authValidationJWT");

routes.get(
  "/getall",
  // isAuthorizedUser,
  ReviewController.getAll
);

// get cart by LEARNER id
routes.get(
  "/get-review-by-courseId/:id",
  // isAuthorizedUser,
  ReviewController.getReviewByCourseId
);

// get review by review id
routes.get(
  "/get-review-by-reviewId/:id",
  // isAuthorizedUser,
  ReviewController.getReviewByReviewId
);

routes.post(
  "/add-review/:id",
  //   isAuthorizedUser,
  //   cartValidator.addItemToCart,
  ReviewController.addReview
);

routes.patch(
  "/remove-review/:id",
  //   isAuthorizedUser,
  // cartValidator.addItemToCart,
  ReviewController.deleteReview
);

routes.patch(
  "/update-review/:id",
  //   isAuthorizedUser,
  // cartValidator.addItemToCart,
  ReviewController.updateReview
);

export default routes;
