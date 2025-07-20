const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const flightsRouter = require('./routes/flights.js');
const authRoutes = require('./routes/auth.js');
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'https://flight-search-cpsc2650-g4cupn2nb-lucasosilvas-projects.vercel.app/',
    credentials: true
}));
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log("Connected to MongoDB Atlas"))
    .catch((err)=> console.error("MongoDB connection error: ", err));

app.use('/flights', flightsRouter);
app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log(`REST API running at http://localhost:${PORT}.`);
})