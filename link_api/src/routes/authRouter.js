import { Router } from 'express'
import {AuthController} from "../controllers/AuthController.js";
import {validateLoginUser, validateRegisterUser} from "../validators/authValidators.js";

const authRouter = Router()

authRouter.post('/register', validateRegisterUser, AuthController.register)
authRouter.post('/login', validateLoginUser,AuthController.login)

export default authRouter;
