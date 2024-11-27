import { Router } from 'express';
import { ApiController } from '../controllers/ApiController.js'
import {HomeController} from "../controllers/HomeController.js";

export const apiRouter = Router()

apiRouter.get('/', ApiController.apiInfo)
apiRouter.get('/home', HomeController.homePage)
