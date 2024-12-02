import mongoose from "mongoose"
import { v4 as uuidV4 } from 'uuid';

class ShortenedUrl {
    constructor() {
        const schema = new mongoose.Schema({
            originalUrl: {
                type: String,
                required: true
            },
            shortCode: {
                type: String,
                required:  true,
                unique: true
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        },
            {
                timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
            }
        )

        this.model = mongoose.model('ShortenedUrl', schema, 'ShortenedUrl');
    }

    async createShortenedUrl(originalUrl, userId) {
        let shortCode = this.generateUniqueCode()

        const shortenedUrl = new this.model({
            originalUrl,
            shortCode,
            userId
        })

        try {
            return await shortenedUrl.save()
        } catch (e) {
            console.error('Error saving the shortened URL:', e)

            throw e
        }
    }

    generateUniqueCode() {
        const uuid = uuidV4();
        const base64EncodedUuid = Buffer.from(uuid).toString('base64');

        return base64EncodedUuid.replace(/=+$/, '').substring(0, 6);
    }

}

export default new ShortenedUrl
