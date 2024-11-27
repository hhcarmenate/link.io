import { Router } from 'express'
import {UserController} from "../controllers/UserController.js";

const userRouter = Router()

userRouter.get('', UserController.getUsers)
userRouter.post('', UserController.storeUser)
userRouter.get('/:id', UserController.getUserById)
userRouter.put('/:id', UserController.updateUser)
userRouter.delete('/:id', UserController.deleteUser)

export default userRouter;
