const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const seasonPlanFolderPath = path.join(__dirname, "storage", "seasonPlanList");

// Method to read an seasonPlan from a file
function get(seasonPlanId) {
  try {
    const filePath = path.join(seasonPlanFolderPath, `${seasonPlanId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadSeasonPlan", message: error.message };
  }
}

// Method to write an seasonPlan to a file
function create(seasonPlan) {
  try {
    seasonPlan.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(seasonPlanFolderPath, `${seasonPlan.id}.json`);
    const fileData = JSON.stringify(seasonPlan);
    fs.writeFileSync(filePath, fileData, "utf8");
    return seasonPlan;
  } catch (error) {
    throw { code: "failedToCreateSeasonPlan", message: error.message };
  }
}

// Method to update seasonPlan in a file
function update(seasonPlan) {
  try {
    const currentSeasonPlan = get(seasonPlan.id);
    if (!currentSeasonPlan) return null;
    const newSeasonPlan = { ...currentSeasonPlan, ...seasonPlan };
    const filePath = path.join(seasonPlanFolderPath, `${seasonPlan.id}.json`);
    const fileData = JSON.stringify(newSeasonPlan);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newSeasonPlan;
  } catch (error) {
    throw { code: "failedToUpdateSeasonPlan", message: error.message };
  }
}

// Method to remove an seasonPlan from a file
function remove(seasonPlanId) {
  try {
    const filePath = path.join(seasonPlanFolderPath, `${seasonPlanId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveSeasonPlan", message: error.message };
  }
}

// Method to list seasonPlans in a folder
function list() {
  try {
    const files = fs.readdirSync(seasonPlanFolderPath);
    const seasonPlanList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(seasonPlanFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return seasonPlanList;
  } catch (error) {
    throw { code: "failedToListSeasonPlans", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
