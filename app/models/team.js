const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    qb: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    rb: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    wr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    wr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    wr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    te: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    flex: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    dst: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Team', teamSchema)