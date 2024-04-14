const seasonPlanDao = require("../../dao/seasonPlan-dao.js");

async function ListAbl(req, res) {
  try {
    const seasonPlanList = seasonPlanDao.list();
    res.json(seasonPlanList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
