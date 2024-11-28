import { Router } from 'express';
import { ApiController } from '../controllers/ApiController.js'
import {HomeController} from "../controllers/HomeController.js";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";

export const apiRouter = Router()

apiRouter.get('/', ApiController.apiInfo)
apiRouter.get('/home', HomeController.homePage)

apiRouter.use('/users', userRouter)
apiRouter.use('/users', authRouter)
