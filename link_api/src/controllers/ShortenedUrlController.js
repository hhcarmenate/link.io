import ShortenedUrl from "../models/ShortenedUrl.js";

export class ShortenedUrlController {

    /**
     * Retrieves a collection of shortened URLs belonging to a specific user using their user
     * ID from the request parameters.
     *
     * @param res
     * @param {Object} req - The request*/
    static async getShortenedUrls(req, res) {
        try {
            const userId = req.params.userId

            const urls = await ShortenedUrl.getShortenedUrlByUserId(userId)

            res.status(200).json({
                data: urls,
                message: 'Shortened Urls collection was successfully retrieved'
            })
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: 'Oops, something went wrong!' })
        }
    }

    /**
     * Stores the shortened URL in the database associated with a specific user ID.
     *
     * @param {Object} req - The request object containing the original URL and user ID.
     * @param {Object} res - The response object to send the JSON response.
     *
     * @return {Promise} A promise that resolves with a JSON response of the stored shortened URL data and a success message,
     * or rejects with an error message in case of failure.
     *
     */
    static async storeShortenedUrl(req, res) {
        const { originalUrl } = req.body
        const userId = req.params.userId

        try {
            const shortedUrl = await ShortenedUrl.createShortenedUrl({ originalUrl, userId })


            res.status(200).json({
                data: shortedUrl,
                message: 'Shortened created successfully'
            })
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: 'Oops, something went wrong!' })
        }
    }

    /**
     * Updates the information of a shortened URL with the provided ID using the data from the request body.
     *
     * @param {Object} req - The request object containing the parameters and body data.
     * @param {Object} res - The response object used to send the updated shortened URL information.
     *
     * @return {Object} An object containing the updated shortened URL data and a success message if the update is successful.
     * If an error occurs during the update process, an error message is returned.
     */
    static async updateShortenedUrl(req, res) {
        try {
            const updatedShortenedUrl = await ShortenedUrl.updateShortenedUrl(req.params.id, req.body)

            res.status(200).json({
                data: updatedShortenedUrl,
                message: 'Shortened information updated successfully'
            })
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: 'Oops, something went wrong!' })
        }
    }

    /**
     * Remove a shortened URL from the database.
     *
     * @param {object} req - The request object containing the parameters.
     * @param {object} res - The response object to send a result back.
     *
     * @return {object} The removed shortened URL information along with a success message if removal was successful;
     *                  an error message if removal encountered any issues.
     */
    static async removeShortenedUrl(req, res){
        try {
            const removedShortenedUrl = await ShortenedUrl.deleteShortenedUrl(req.params.id)

            res.status(200).json({
                data: removedShortenedUrl,
                message: 'Shortened information removed successfully'
            })
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: 'Oops, something went wrong!' })
        }
    }
}
