import {body, param, validationResult} from "express-validator";

export const validateShortenedCreation = [
    body('originalUrl').isURL().notEmpty().withMessage('Original Url is required'),
    param('id').isMongoId().withMessage('Invalid user ID format'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        next()
    }
]

export const validateGetShortenedUrls = [
    param('id').isMongoId().withMessage('Invalid user id format'),
    (req, res, next) => {
        const errors  = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        next()
    }
]

export const validateShortenedUpdate = [
    param('id').isMongoId().withMessage('Invalid shortened user id format'),
    body('originalUrl').isURL().notEmpty().withMessage('Original Url is required'),
    (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

        next()
    }
]

export const validateShortenedId = [
    param('id').isMongoId().withMessage('Invalid shortened user id format'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        next()
    }
]

