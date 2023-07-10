const express = require('express');
const { Pixsly } = require('../models/pixsly');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    res.json(await Pixsly.find({})).status(200);
})

router.get('/seed', async (req, res) => {
    await Pixsly.deleteMany({});
    await Pixsly.create(pixslyData);
    res.redirect('/pixsly')
})

router.get('/:id', async (req, res) => {
    res.json(await Pixsly.findById(req.params.id))
})

router.post('/', async (req, res) => {
    res.json(await Pixsly.create(req.body))
})

router.put('/:id', async (req, res) => {
    res.json(await Pixsly.findByIdAndUpdate(req.params.id, req.body, {new: true}))
})

router.delete('/:id', async (req, res) => {
    res.json(await Pixsly.findByIdAndRemove(req.params.id))
})

module.exports = router;