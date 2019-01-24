const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        // required: true
    },
    players: [],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Team', teamSchema)