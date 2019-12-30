const router = require('express').Router()
const {Text} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const texts = await Text.findAll()
    res.json(texts)
  } catch (err) {
    next(err)
  }
})