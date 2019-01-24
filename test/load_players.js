const mongoose = require('mongoose')
const fs = require('fs')
const dbAddress = require('../config/db')
const Player = require('../app/models/player.js')

mongoose.Promise = global.Promise
mongoose.connect(dbAddress, {
  useMongoClient: true
})

const db = mongoose.connection

const done = () => db.close()

const parsePlayers = () => {
  return new Promise((resolve, reject) => {
    const players = []
    const parse = require('csv').parse
    const parser = parse({ columns: true })

    const input = fs.createReadStream('bin/allplayers.csv')
    input.on('error', e => reject(e))

    parser.on('readable', () => {
      let record
      while (record = parser.read()) { // eslint-disable-line
        players.push(record)
      }
    })

    parser.on('error', e => reject(e))
    parser.on('finish', () => resolve(players))
    input.pipe(parser)
  })
}
parsePlayers()
.then(players => {
    return Promise.all(players.map(player => {
        return Player.create({
          name: player.name,
          pos: player.pos,
          dollar: player.dollar
        })
      }))
})
.then(players => {
  console.log(`Created ${players.length} players!`)
})
.catch(console.error)
.then(done)