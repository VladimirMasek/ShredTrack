const Ajv = require("ajv");
const ajv = new Ajv();

const trickDao = require("../../dao/trick-dao.js");

const schema = {
  type: "object",
  properties: {
    feature: { type: "string" },
    difficulty: { type: "integer" },
  },
  required: ["feature", "difficulty"],
  additionalProperties: false,
};

async function listByFeatureAndDifficultyAbl(req, res) {
  try {
    const reqParams = req.body;

    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });

      return;
    }

    const trickList = trickDao.listByFeatureAndDifficulty(
      reqParams.feature,
      reqParams.difficulty
    );

    res.json(trickList);
  } catch (error) {
    throw {
      code: "failedToListByFeatureAndDifficulty",
      message: error.message,
    };
  }
}

module.exports = listByFeatureAndDifficultyAbl;
