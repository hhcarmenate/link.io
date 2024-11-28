import jwtConfig from "../config/jwtConfig.js";
import jwt from 'jwt-simple'

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, no token provided!' })
    }

    try {
        req.user = jwt.decode(token, jwtConfig.jwtSecret)
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized, Invalid Token' })
    }
}
