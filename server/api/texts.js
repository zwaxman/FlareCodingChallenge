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

router.post('/', async (req, res, next) => {
  try {
    const text = await Text.create(req.body)
    res.json(text)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const text = await Text.findByPk(req.params.id)
    res.json(text)
  } catch (err) {
    next(err)
  }
})