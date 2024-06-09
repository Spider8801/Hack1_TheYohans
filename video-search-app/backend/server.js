const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/getVideo', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await axios.post('https://api.twelvelabs.io/search', {
            // The request body required by Twelve Labs API
            prompt: prompt
        }, {
            headers: {
                'Authorization': `Bearer tlk_3FFX0ZW3XY8HMQ22Q7A3S028TTTR`,
                'Content-Type': 'application/json'
            }
        });
        const videoUrl = response.data.video_url; // Adjust based on actual response structure
        res.json({ videoUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch video URL' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
