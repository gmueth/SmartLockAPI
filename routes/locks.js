const {Lock, validate} = require('../models/lock');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const locks = await Lock.find();
  res.send(locks);
});

router.put('/:id', async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const lock = await Lock.findByIdAndUpdate(req.params.id, { status: req.body.status },
    { new: true });

  if (!lock) return res.status(404).send('The lock with the given ID was not found.');

  res.send(lock);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const lock = new Lock({ status: req.body.status });
  
  await lock.save();
  
  res.send(lock);
});

router.get('/:id', async (req, res) => {
  const lock = await Lock.findById(req.params.id);

  if (!lock) return res.status(404).send('The lock with the given ID was not found.');

  res.send(lock);
});

module.exports = router;
