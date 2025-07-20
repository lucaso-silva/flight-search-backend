const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Flight = require('./models/Flight.js');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Connected to MongoBD Atlas");
        return Flight.insertMany([
            {
                "from": "YVR",
                "to": "JFK",
                "price": 350,
                "airline": "Air Canada",
                "departureTime": "2025-06-01T09:00:00"
            },
            {
                "from": "YVR",
                "to": "YYZ",
                "price": 280,
                "airline": "WestJet",
                "departureTime": "2025-06-01T12:30:00"
            },
            {
                "from": "YYZ",
                "to": "JFK",
                "price": 320,
                "airline": "Porter Airlines",
                "departureTime": "2025-06-01T15:00:00"
            },
            {
                "from": "YYZ",
                "to": "YUL",
                "price": 250,
                "airline": "Air Canada",
                "departureTime": "2025-06-01T17:45:00"
            },
            {
                "from": "YVR",
                "to": "YYZ",
                "price": 99,
                "airline": "Flair Airlines",
                "departureTime": "2025-06-02T06:50:00"
            },
            {
                "from": "YVR",
                "to": "YYZ",
                "price": 220,
                "airline": "Porter Airlines",
                "departureTime": "2025-06-02T11:15:00"
            },
            {
                "from": 'YVR',
                "to": 'YYZ',
                "price": 299,
                "airline": 'Air Canada',
                "departureTime": '2025-06-01T09:00:00'
            },
            {
                "from": 'YVR',
                "to": 'YYC',
                "price": 129,
                "airline": 'WestJet',
                "departureTime": '2025-06-02T08:00:00'
            }
        ]);
    })
    .then(()=>{
        console.log("Seeded flight data");
        mongoose.disconnect();
    })
    .catch(err => {
        console.error(err);
        mongoose.disconnect();
    })