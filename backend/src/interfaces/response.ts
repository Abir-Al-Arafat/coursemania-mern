import { IAuth } from "../model/AuthModel";
// import {ILearner} from "../model/LearnerModel"

// export type IAuthResponse = Omit<IAuth, "password"> & { token: string };
export type IAuthResponse = Omit<
    IAuth,
    | "password"
    | "wrongAttempts"
    | "isLocked"
    | "lockedTill"
    | "resetPassword"
    | "resetPasswordToken"
    | "resetPasswordExpire"
> & { token: string };
