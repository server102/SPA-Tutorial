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
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'This email account is already in use',
        inputType: 'email'
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

      const isPasswordValid = user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect password'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to log in'
      })
    }
  }

}
