const express = require('express');
const { Pixsly } = require('../models/pixsly');
const router = express.Router();
const pixslyData = require('../models/pixslyData.json');
const imgbbUploader = require("imgbb-uploader");
const { IMGBB_API_KEY } = require('../config');

router.get('/', async (req, res) => {
    const data = await Pixsly.find({});
    console.log(data); // Add this line
    res.json(data).status(200);
  });

router.get('/seed', async (req, res) => {
    await Pixsly.deleteMany({});
    await Pixsly.create(pixslyData);
    res.redirect('/pixslys')
})

router.get('/:id', async (req, res) => {
    res.json(await Pixsly.findById(req.params.id))
})

router.post('/', async (req, res) => {
    console.log(req.body)
    const bbOptions = {apiKey: IMGBB_API_KEY, base64string: req.body.image}
    const imageResponse = await imgbbUploader(bbOptions)

    const newPixsly = {
        name: req.body.name,
        image: imageResponse.url,
        description: req.body.description
    }
    res.json(await Pixsly.create(newPixsly))
})

router.put("/:id", async (req, res, next) => {
    console.log("updating space");
    console.log(req.body);
    const {
      name,
      description,
      image,
    } = req.body;
    try {
      const pixsly = await Pixsly.findById(req.params.id);
      if (!pixsly) {
        return res.status(404).json({ message: "Space not found" });
      }
      // If image is provided in the request body, upload it to imgbb
      if (image) {
        const bbOptions = {
          apiKey: IMGBB_API_KEY, // MANDATORY apikey for imgBB
          base64string: image,
        };
        const imageResponse = await imgbbUploader(bbOptions);
        console.log(imageResponse.url);
        pixsly.image = imageResponse.url;
      }
      // Update title and description regardless
      pixsly.name = name;
      pixsly.description = description;
      const updatedPixsly = await pixsly.save();
      return res.status(200).json(updatedPixsly);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  });

  
router.delete('/:id', async (req, res) => {
    res.json(await Pixsly.findByIdAndRemove(req.params.id))
})

module.exports = router;