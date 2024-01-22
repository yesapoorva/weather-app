import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.get('/weather/:location', async (req, res) => {
    const location = req.params.location;
    const apiKey = '2b2faa59845d60fcd09764d166255c75';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

