import { bodyLoginValidator, validationUseOrpassRegister } from "../middlewares/validationUser.js";

export const rulesAuthRegister = [validationUseOrpassRegister];
export const rulesAuthLogin = [bodyLoginValidator]