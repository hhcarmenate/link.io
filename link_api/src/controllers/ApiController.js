import connect from "../database/db.js";

export class ApiController {
    static async apiInfo(req, res) {

        connect()

        return res.json({ message: 'This is an api to shorten url.' })
    }
}
