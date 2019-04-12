const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      name: Joi.string().min(2).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(8).required()
    }

    // const { error, value } = Joi.validate(req.body, schema)
    const { error } = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'name':
          res.status(400).send({
            error: 'Your full name is required'
          })
          break
        case 'email':
          res.status(400).send({
            error: 'Your email address is not valid'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'Your password isn\'t strong enough, try making it longer'
          })
          break
        default:
          res.status(400).send({
            error: 'Error validating input fields, please try again'
          })
      }
    } else {
      next()
    }
  }
}
