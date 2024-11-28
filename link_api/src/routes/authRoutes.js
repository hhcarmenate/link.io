import { Router } from 'express'
import {AuthController} from "../controllers/AuthController.js";
import {validateLoginUser, validateRegisterUser} from "../validators/authValidators.js";

const userRouter = Router()

userRouter.post('/register', validateRegisterUser, AuthController.register)
userRouter.post('/login', validateLoginUser,AuthController.login)

export default userRouter;
