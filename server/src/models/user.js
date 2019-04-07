'use strict'
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

const hashPassword = (user) => {
  if (!user.changed('password')) return

  return bcrypt
    .hashAsync(user.password, null, null)
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (password, cb) {
    return bcrypt.compareAsync(password, this.password)
  }

  return User
}
