require('dotenv').config()

module.exports = {
  port: process.env.PORT,
  jwt_secret: process.env.SECRET,
  db: {
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    options: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT
    }
  }
}
