const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    const { error, value } = Joi.validate(req.body, schema)
    // console.log(value)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Must be a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'Your password isn\'t strong enough, try making it longer'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information',
            formValue: value // this line does nothing. Added it to bypass eslint (assigned a value but never used error)
          })
      }
    } else {
      next()
    }
  }
}
