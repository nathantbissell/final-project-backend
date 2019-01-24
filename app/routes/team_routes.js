// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for teams
const Team = require('../models/team')

// we'll use this to intercept any errors that get thrown and send them
// back to the client with the appropriate status code
const handle = require('../../lib/error_handler')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /teams
router.get('/teams', (req, res) => {
  Team.find()
    .then(teams => {
      // `teams` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return teams.map(team => team.toObject())
    })
    // respond with status 200 and JSON of the teams
    .then(teams => res.status(200).json({ teams: teams }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// SHOW
// GET /teams/5a7db6c74d55bc51bdf39793
router.get('/teams/:_id', (req, res) => {
  // req.params.id will be set based on the `:id` in the route
  Team.findById(req.params._id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "team" JSON
    .then(team => res.status(200).json({ team: team.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// CREATE
// POST /teams
router.post('/teams', requireToken, (req, res) => {
  // set owner of new team to be current user
  req.body.team.owner = req.user._id
  Team.create(req.body.team)
    // respond to succesful `create` with status 201 and JSON of new "team"
    .then(team => {
      res.status(201).json({ team: team.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(err => handle(err, res))
})

// UPDATE
// PATCH /teams/5a7db6c74d55bc51bdf39793
router.patch('/teams/:_id', requireToken, (req, res) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.team.owner
  
  Team.findById(req.params._id)
    .then(handle404)
    .then(team => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, team)

      // the client will often send empty strings for parameters that it does
      // not want to update. We delete any key/value pair where the value is
      // an empty string before updating
      Object.keys(req.body.team).forEach(key => {
        if (req.body.team[key] === '') {
          delete req.body.team[key]
        }
      })

      // pass the result of Mongoose's `.update` to the next `.then`
      return team.update(req.body.team)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// DESTROY
// DELETE /teams/5a7db6c74d55bc51bdf39793
router.delete('/teams/:_id', requireToken, (req, res) => {
  Team.findById(req.params._id)
    .then(handle404)
    .then(team => {
      // throw an error if current user doesn't own `team`
      requireOwnership(req, team)
      // delete the team ONLY IF the above didn't throw
      team.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

// router.delete('/teams/:_id', requireToken, (req, res) => {
//   // req.body.team.owner = req.user._id
//   // User.findOne({ id: req.body.team.owner }).then(function(user) {
//   //   console.log('within findOne method')
//   //   const isOwner = req.user.owner
//   //   if (isOwner === true) {
//     Team.findOne({ name: req.body.team.name })
//     console.log('req.body.team.owner', req.body.team.owner)
//     console.log('req.user._id', req.user._id)
//       .then(teamFound => {
//         console.log('teamfound ', teamFound)
//         if (req.body.team.owner === req.user._id) {
//           return res.status(401).end()
//         }
//         if (!teamFound) { return res.status(404).end() }
        
//       })
    
  // })
  //   .then(handle404)
  //   .then(team => {
  //     // throw an error if current user doesn't own `team`
  //     requireOwnership(req, team)
  //     // delete the team ONLY IF the above didn't throw
  //     team.remove()
  //   })
  //   // send back 204 and no content if the deletion succeeded
  //   .then(() => res.sendStatus(204))
  //   // if an error occurs, pass it to the handler
  //   .catch(err => handle(err, res))


module.exports = router
