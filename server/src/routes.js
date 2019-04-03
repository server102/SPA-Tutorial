module.exports = (app) => {
  return app.get('/login', (req, res) => {
    res.send({
      message: 'Refactoring login routes'
    })
  })
}
