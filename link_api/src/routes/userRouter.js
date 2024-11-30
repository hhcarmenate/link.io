import { Router } from 'express'
import {UserController} from "../controllers/UserController.js";
import {validateUserCreation, validateUserId, validateUserUpdate} from "../validators/userValidators.js";
import { authMiddleware } from '../middlewares/authMiddleware.js'

const userRouter = Router()

userRouter.use(authMiddleware)

userRouter.get('', UserController.getUsers)
userRouter.post('', validateUserCreation, UserController.storeUser)
userRouter.get('/:id', validateUserId,UserController.getUserById)
userRouter.put('/:id', validateUserId, validateUserUpdate,UserController.updateUser)
userRouter.delete('/:id', validateUserId,UserController.deleteUser)

export default userRouter;
