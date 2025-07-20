const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Flight = require('../models/Flight.js');
const {verify} = require("jsonwebtoken");
const {verifyToken} = require('../middleware/auth');

const router = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, try again later.'
});

router.use(limiter);

//GET all flights -> /flights
// router.get('/', (req,res)=>{
//     res.json(flights);
// });

//GET flights by query params -> /flights?from=YVR&to=YYZ&page=1&limit=5
router.get('/', async (req,res)=>{
    try {
        const { from, to } = req.query;

        const filter = {};
        if(from) filter.from = from;
        if(to) filter.to = to;

        const flights = await Flight.find(filter);
        res.json(flights.map(f => ({ ...f._doc, id: f._id })));

    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch flights'});
    }
});

//GET a single flight -> /flights/id
router.get('/:id', verifyToken, async (req,res)=>{
   try{
       const f = await Flight.findById(req.params.id);
       f ? res.json({ ...f._doc, id: f._id }) : res.status(404).json({ error: 'Flight not found' });
   } catch(err) {
       res.status(400).json({ error: 'Invalid ID' });
   }
});

//POST -> /flights
router.post('/', async (req, res) => {
    try{
        const newFlight = new Flight({...req.body, from: req.body.from.toUpperCase(), to: req.body.to.toUpperCase()});
        const saved = await newFlight.save();
        res.status(200).json({ ...saved._doc, id: saved._id });

    } catch(err) {
        res.status(400).json({ error: 'Invalid Input' });
    }
});

//DELETE a flight
router.delete('/:id', async (req,res)=> {
    try{
        const deleted = await Flight.findByIdAndDelete(req.params.id);
        deleted ? res.json({ message: 'Flight deleted' }) : res.status(404).json({ error: 'Not found' });
    } catch {
        res.status(400).json({ error: 'Invalid ID' });
    }
});

module.exports = router;