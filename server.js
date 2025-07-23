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

let whitelist = ['https://flight-search-cpsc2650.vercel.app', 'https://flight-search-cpsc2650-git-main-lucasosilvas-projects.vercel.app', 'https://flight-search-cpsc2650-45pxfb839-lucasosilvas-projects.vercel.app'];

let corsOptions = {
    origin: function(origin, callback){
        if(whitelist.indexOf(origin)!==-1){
            callback(null,true);
        }else{
            callback(new Error('Not allowed by cors'));
        }
    }
}

// app.use(cors({
//     origin: 'https://flight-search-cpsc2650-i8ssm6w1s-lucasosilvas-projects.vercel.app',
//     credentials: true
// }));

app.use(cors(corsOptions));
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