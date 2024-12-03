import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import {ShortenedUrlController} from "../controllers/ShortenedUrlController.js"
import {
    validateGetShortenedUrls,
    validateShortenedCreation,
    validateShortenedUpdate,
    validateShortenedId
} from "../validators/shortenedValidators.js"

const shortenedRouter = Router()

shortenedRouter.use(authMiddleware)

shortenedRouter.get('', validateGetShortenedUrls, ShortenedUrlController.getShortenedUrls)
shortenedRouter.post('', validateShortenedCreation, ShortenedUrlController.storeShortenedUrl)
shortenedRouter.put('/:id', validateShortenedUpdate, ShortenedUrlController.updateShortenedUrl)
shortenedRouter.delete('/:id', validateShortenedId, ShortenedUrlController.removeShortenedUrl)

export default userRouter;
