const express = require('express');
const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API connection was successful',
    });
});

const gptRoutes = require('./routes/gptRoutes');
app.use('/gpt', gptRoutes);

const port = process.env.PORT || 5000;

console.log('OPENAI_API_KEY = ', process.env.OPENAI_API_KEY);

app.listen(port, () => console.log(`Server listening on port ${port}`));