const express = require('express');
const router = express.Router();
const {Event, validate} = require('../models/event');
const {Lock} = require('../models/lock');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const event = new Event({ 
        lockid: req.body.lockid,
        userid: req.body.userid,
        date: Date.now(),
        status: req.body.status 
    });

    const lock = await Lock.findByIdAndUpdate(req.body.lockid, { status: req.body.status },
        { new: true });
    
    if (!lock) return res.status(404).send('The lock with the given ID was not found.');
    
    await lock.save();
    await event.save();
    
    res.send(event);
  });

module.exports = router; 