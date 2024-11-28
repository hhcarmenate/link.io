import User from "../models/User.js";
import jwt from "jwt-simple";
import jwtConfig from "../config/jwtConfig.js";

export class AuthController {
    /**
     * Registers a new user with the provided information.
     *
     * @param {Object} req - The request object containing user information in the body (name, email, password).
     * @param {Object} res - The response object to send the result of registration.
     *
     * @return {Promise<void>} A promise that resolves when the user is successfully registered, or rejects with an error if registration fails.
     */
    static async register(req, res) {
        const { name, email, password } = req.body
        console.log('registering new user', name, email, password)

        try {
            const user = await User.createUser({ name, email, password })

            res.status(201).json({
                message: 'User registered successfully!',
                user
            })
        } catch (err) {
            console.error(err)

            res.status(500).json({
                message: 'Error registering the user',
                error: err
            })
        }
    }

    /**
     * Authenticates a user by checking the provided email and password against existing records.
     *
     * @param {Object} req - The request object containing user credentials in the request body.
     * @param {Object} res - The response object to send back the authentication result.
     *
     * @return {Object} JSON object with a token and a message indicating the result of the authentication:
     * - If user is found, returns a token and message 'User logged successfully' with a 200 status code.
     * - If user is not found, returns a message 'User not found' with a 404 status code.
     * - If an error occurs during the authentication process, returns an error message along with a 500 status code.
     */
    static async login(req, res){
        const { email, password } = req.body

        try {
            const user = await User.model.findOne({ email})

            if (!user) {
                return res.status(404).json({ message: 'User not found!' })
            }

            const isMatch = await user.comparePassword(password)

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid user credentials!'})
            }

            const payload = { id: user.id, email: user.email }
            const token = jwt.encode(payload, jwtConfig.jwtSecret)

            return res.status(200).json({ token, message: 'User logged successfully!'})
        } catch (err) {
            console.log(err)

            res.status(500).json({
                message: 'Error logging in',
                error: err
            })
        }

    }
}
