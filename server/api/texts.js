const router = require("express").Router();
const { Text } = require("../db/models");
module.exports = router;

const numPrevTextsToSave = 10;

router.get("/", async (req, res, next) => {
  try {
    const texts = await Text.findAll({
      attributes: ["createdAt", "fileName", "id"],
      order: [["createdAt", "DESC"]]
    });
    res.json(texts);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const text = await Text.create(req.body);
    if (text.id > numPrevTextsToSave) {
      await Text.destroy({ where: { id: text.id - numPrevTextsToSave } });
    }
    res.json(text);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const text = await Text.findByPk(req.params.id);
    res.json(text);
  } catch (err) {
    next(err);
  }
});
