const { mongoose } = require('mongoose')

const pixslySchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
})

const Pixsly = mongoose.model('Pixsly', pixslySchema, 'pixsly')

module.exports = {Pixsly};