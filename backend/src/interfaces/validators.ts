import { ValidationChain } from "express-validator";

type TCourseValidator = {
    create: ValidationChain[];
    update: ValidationChain[];
};

// export { TCourseValidator };
