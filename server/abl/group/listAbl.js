const groupDao = require("../../dao/group-dao.js");

async function ListAbl(req, res) {
  try {
    const groupList = groupDao.list();
    res.json(groupList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
