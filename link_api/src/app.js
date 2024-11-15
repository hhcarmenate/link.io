import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api', (req, res) => {
    res.send('Hello from the Express API!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
