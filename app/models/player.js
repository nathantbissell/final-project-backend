const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pos: {
        type: String,
        required: true
    },
    dollar: {
        type: Number,
        required: true
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Player', playerSchema)