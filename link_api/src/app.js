import express from 'express';
import dotenv from 'dotenv'
import { apiRouter } from './routes/apiRoutes.js'
import cors from 'express'
import connect from './database/db.js'

// Loading env vars
dotenv.config()

const app = express();

// Connect to MongoDB
connect()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.disable('z-powered-by')

app.use('/api/v1', apiRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://dev.app.link.io`);
});
