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

        schema.index({ userId: 1 })

        this.model = mongoose.model('ShortenedUrl', schema, 'shortened_urls');
    }


    async createShortenedUrl({originalUrl, userId}) {
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

    async getShortenedUrlByUserId(userId) {
        try {
            return await this.model.find({ userId }).populate('userId').exec();
        } catch (e) {
            console.error('Error retrieving shortened URLs for user:', e);
            throw e;
        }
    }

    async getShortenedUrlByShortcode(shortcode) {
        try {
            return await this.model.findOne({ shortCode }).populate('userId').exec();
        } catch (e) {
            console.error('Error retrieving URL for shortCode:', e);
            throw e;
        }
    }

    async updateShortenedUrl(shortenedId, shortenedData) {
        try {
            return this.model.findByIdAndUpdate(shortenedId, shortenedData, {
                new: true,
                runValidators: true
            })
        } catch (e) {
            console.error('Error updating the shortened url data')
            throw e
        }
    }

    async deleteShortenedUrl(shortenedId) {
        try {
            return this.model.findByIdAndDelete(shortenedId, {
                new: true
            })
        } catch (e) {
            console.error('Error deleting the shortened url data')
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
