const { mongoose } = require('mongoose')

const pixslysSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

const Pixsly = mongoose.model('Pixsly', pixslysSchema, 'pixslys')

module.exports = {Pixsly};