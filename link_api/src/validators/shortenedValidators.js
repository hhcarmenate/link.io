import {body, param, validationResult} from "express-validator";
import userInstance from "../models/User.js";

export const validateShortenedCreation = [
    body('originalUrl').isURL().notEmpty().withMessage('Original Url is required'),
    param('userId')
        .isMongoId().withMessage('Invalid user ID format')
        .bail()
        .custom(async (userId) => {
            const user = await userInstance.getUserById(userId);
            if (!user) {
                throw new Error('User ID does not exist');
            }
        }),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        next()
    }
]

export const validateGetShortenedUrls = [
    param('userId').isMongoId().withMessage('Invalid user id format'),
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

