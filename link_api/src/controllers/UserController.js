import User from '../models/User.js'

export class UserController {

    /**
     * Retrieves a list of users from the database.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *
     * @return {Promise} A Promise that resolves with the list of users fetched from the database in JSON format.
     */
    static async getUsers(req, res) {
        try {
            const users = await User.getUsers()
            res.status(200).json({
                data: users,
                message: 'User collection was successfully retrieved'
            })
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: 'Oops, something went wrong!' })
        }
    }

    /**
     * Stores a new user based on the request parameters.
     *
     * @param {Object} req - The request object containing user parameters.
     * @param {Object} res - The response object to send back.
     *
     * @return {Promise<void>} - A Promise that resolves once the user is stored, or rejects with an error.
     */
    static async storeUser(req, res) {
        const { name, email, password } = req.body

        console.log('checking data', name, email, password, req.body)

        try {
            const user = await User.createUser({ name, email, password })
            res.status(200).json({
                data: user,
                message: 'User created successfully'
            })
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: 'Oops, something went wrong!' })
        }
    }

    /**
     * Retrieves a user by their ID from the database.
     *
     * @param {object} req - The request object containing the user ID as a parameter.
     * @param {object} res - The response object to send back the retrieved user data.
     *
     * @return {Promise} A Promise that resolves with the user data if successful, or an error message if user is not found or an error occurs.
     */
    static async getUserById(req, res) {
        try {
            const userId = req.params.id
            const user = await User.getUserById(userId)

            if (!user) {
               return res.status(404).json({ message: 'User not found!' })
            }

            res.status(200).json(user)
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: 'Oops, something went wrong!' })
        }
    }

    /**
     * Updates the user information based on the provided user id and request body.
     *
     * @param {object} req - The request object containing user id and new user information.
     * @param {object} res - The response object used to send back the updated user information or an error message.
     *
     * @return {Promise} A Promise that resolves with the updated user object if successful, or rejects with an error message if an error occurs.
     */
    static async updateUser(req, res) {
        try {
            const updatedUser = await User.updateUser(req.params.id, req.body)

            res.status(200).json({
                data: updatedUser,
                message: 'User information updated successfully'
            })
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: 'Oops, something went wrong!' })
        }
    }

    /**
     * Deletes a user from the system based on the provided user ID.
     *
     * @param {Object} req - The request object containing parameters, such as user ID.
     * @param {Object} res - The response object for sending back the result of the deletion operation.
     *
     * @return {Object} - Response JSON object indicating the outcome of the deletion operation.
     */
    static async deleteUser(req, res) {
        try {
            const deletedUser = await User.deleteUser(req.params.id)

            res.status(200).json({
                message: 'User deleted successfully',
                data: deletedUser
            })
        } catch (err) {
            console.log(err.message)
            res.status(500).json({message: 'Oops something went wrong!'})
        }
    }

}
