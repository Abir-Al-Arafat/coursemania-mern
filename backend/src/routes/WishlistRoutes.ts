import express from "express";
const routes = express();
// const { userValidator, productValidator, cartValidator } = require("../middleware/validation");

// const { isAuthenticated, isAdmin } = require("../middleware/auth");
// const CartController = require("../controller/CartController");

import CartController from "../controller/CartController.ts";
import WishlistController from "../controller/WishlistController.ts";
// const cartValidator = require("../middleware/cartValidation");
// const { isAuthorizedUser } = require("../middleware/authValidationJWT");

routes.get(
  "/getall",
  // isAuthorizedUser,
  WishlistController.getAll
);

// get cart by LEARNER id
routes.get(
  "/:id",
  // isAuthorizedUser,
  WishlistController.getWishlistByLearnerId
);

// get cart by WISHLIST id
routes.get(
  "/get-wishlist-by-wishlistId/:id",
  // isAuthorizedUser,
  WishlistController.getWishlistByWishlistId
);

routes.post(
  "/add-course-to-wishlist/:id",
  //   isAuthorizedUser,
  //   cartValidator.addItemToCart,
  WishlistController.addCourseToWishlist
);

routes.patch(
  "/remove-course-from-wishlist/:id",
  //   isAuthorizedUser,
  // cartValidator.addItemToCart,
  WishlistController.removeCourseFromWishlist
);

export default routes;
