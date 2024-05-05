const Ajv = require("ajv");
const ajv = new Ajv();
const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    members: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["members"],
  additionalProperties: false,
};

async function GetUserListByIdsAbl(req, res) {
  try {
    const valid = ajv.validate(schema, req.body);

    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
    }

    const userIds = req.body;

    const userList = userDao.getUserListByIds(userIds.members);

    if (!userList) {
      return res.status(404).json({
        code: "userListNotFound",
        message: `User list not found for user IDs ${userIds}`,
      });
    }

    return res.json(userList);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

module.exports = GetUserListByIdsAbl;
