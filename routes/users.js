const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate, validatePUT} = require('../models/user');
const {Lock} = require('../models/lock');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {

    const users = await User.find();
    res.send(users);
});

router.get('/:id', async (req, res) => {

    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send('User with the given ID was not found.');

    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.send(_.pick(user, ['_id', 'name', 'email']));
});

router.put('/:id', async (req, res) => {
    const { error } = validatePUT(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const lock = await Lock.findById(req.body.lockID);
    if (!lock) return res.status(400).send('Could not find lock with given ID');

    // User find by and update, push new lock to locks array
    const user = await User.findByIdAndUpdate(req.params.id, {
        $push: {locks: req.body.lockID}
    }, {new: true});
    res.send(user);
});

module.exports = router;