const trickDao = require("../../dao/trick-dao.js");

async function ListAbl(req, res) {
  try {
    const trickList = trickDao.list();
    res.json(trickList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
