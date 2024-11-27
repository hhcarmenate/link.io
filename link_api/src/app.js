import express from 'express';
import dotenv from 'dotenv'
import { apiRouter } from './routes/apiRoutes.js'

// Loading env vars
dotenv.config()

const app = express();

app.use(express.json());
app.disable('z-powered-by')
app.use('/api/v1', apiRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://dev.app.link.io`);
});
