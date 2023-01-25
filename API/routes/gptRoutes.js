const router = require('express').Router();

require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: '',
});
const openai = new OpenAIApi(configuration);

router.post('/create-completion', async (req, res) => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: req.body.message,
            max_tokens: 256,
            temperature: 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });
        
        console.log('req', req.body.message);

        return res.status(200).json({
            success: true,
            data: response.data.choices[0].text,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.response ? error.response.data : 'An error has occurred',
        });
    }
});

module.exports = router;