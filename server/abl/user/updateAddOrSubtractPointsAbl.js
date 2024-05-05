const Ajv = require("ajv");
const ajv = new Ajv();

const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    points: { type: "integer" },
    addOrSubtract: { type: "integer", enum: [0, 1] },
  },
  required: ["userId", "points", "addOrSubtract"],
  additionalProperties: false,
};

async function UpdateAddOrSubtractPointsAbl(req, res) {
  try {
    const { userId, points, addOrSubtract } = req.body;

    // validate input
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
    }

    const updatedUser = userDao.updateAddOrSubtractPoints(
      userId,
      points,
      addOrSubtract
    );
    if (!updatedUser) {
      return res.status(404).json({
        code: "userNotFound",
        message: `User ${userId} not found`,
      });
    }

    res.json(updatedUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAddOrSubtractPointsAbl;
