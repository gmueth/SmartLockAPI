const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const event = new Event({ 
        lockid: req.body.lockid,
        userid: req.body.userid,
        date: 
        status: req.body.status 
    });
    
    await lock.save();
    
    res.send(lock);
  });

module.exports = router;