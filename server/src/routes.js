module.exports = (app) => {
  return app.post('/register', (req, res) => {
    res.send({
      message: `${req.body.email} is registered.`
    })
  })
}
