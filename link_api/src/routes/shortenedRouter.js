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

shortenedRouter.get('/:userId/shortened', validateGetShortenedUrls, ShortenedUrlController.getShortenedUrls)
shortenedRouter.post('/:userId/shortened', validateShortenedCreation, ShortenedUrlController.storeShortenedUrl)
shortenedRouter.put('/:userId/shortened/:id', validateShortenedUpdate, ShortenedUrlController.updateShortenedUrl)
shortenedRouter.delete('/:userId/shortened/:id', validateShortenedId, ShortenedUrlController.removeShortenedUrl)

export default shortenedRouter;
