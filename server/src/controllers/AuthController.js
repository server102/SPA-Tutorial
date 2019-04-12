const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const jwtSignUser = (user) => {
  return jwt.sign(user, config.jwt_secret, {
    expiresIn: '24hr'
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      return res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (error) {
      if (error.parent.fatal) {
        return res.status(500).send({
          error: 'An error occurred creating your new account'
        })
      }

      return res.status(403).send({
        error: 'Email already exists'
      })
    }
  },

  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred trying to log in'
      })
    }
  }

}
