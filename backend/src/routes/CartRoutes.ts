import express from "express";
const routes = express();
// const { userValidator, productValidator, cartValidator } = require("../middleware/validation");

// const { isAuthenticated, isAdmin } = require("../middleware/auth");
// const CartController = require("../controller/CartController");

import CartController from "../controller/CartController.ts";
// const cartValidator = require("../middleware/cartValidation");
// const { isAuthorizedUser } = require("../middleware/authValidationJWT");

routes.get(
    "/getall",
    // isAuthorizedUser,
    CartController.getAll
);

// get cart by LEARNER id
routes.get(
    "/:id",
    // isAuthorizedUser,
    CartController.getCart
);

// get cart by CART id
routes.get(
    "/get-cart-by-cartId/:id",
    // isAuthorizedUser,
    CartController.getCartByCartId
);

routes.post(
    "/add-product-to-cart/:id",
    //   isAuthorizedUser,
    //   cartValidator.addItemToCart,
    CartController.addProductToCart
);

routes.patch(
    "/remove-from-cart/:id",
    //   isAuthorizedUser,
    // cartValidator.addItemToCart,
    CartController.removeProductFromCart
);

// module.exports = routes;
export default routes;
