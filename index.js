import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import transactionHistoryRoutes from './routes/transactionHistoryRoutes.js'
import requireSignin from './middleware/requireSignin.js';
import TransactionHistory from './models/transactionHistoryModel.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cities = require('cities.json');
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json()); 
app.use("/api/", userRoutes);
app.use("/api/", transactionHistoryRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/weather/:location', requireSignin, async (req, res) => {
    const location = req.params.location;
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    console.log(req.user)
    try {
        const newTransaction = new TransactionHistory({
            userId: req.user.id, 
            userEmail: req.user.email,
            city: location,
        });

        await newTransaction.save();

        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//api or dynamic search operations 
app.get('/city-suggestions', (req, res) => {
    const query = req.query.q.toLowerCase();
    const suggestions = cities.filter(city => city.name.toLowerCase().startsWith(query));
    const suggestionNames = suggestions.map(city => city.name);
    res.json({ suggestions: suggestionNames });
  });

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});