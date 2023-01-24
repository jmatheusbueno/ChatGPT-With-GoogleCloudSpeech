const express = require('express');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const app = express();

app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/find-complexity', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server lintening on port ${port}`));