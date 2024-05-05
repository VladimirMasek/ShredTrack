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

function getUserTrickList(userId) {
  try {
    const files = fs.readdirSync(seasonPlanFolderPath);
    for (const file of files) {
      const filePath = path.join(seasonPlanFolderPath, file);
      const fileData = fs.readFileSync(filePath, "utf8");
      const seasonPlan = JSON.parse(fileData);
      if (seasonPlan.userId === userId) {
        return seasonPlan.userTrickList;
      }
    }

    return [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
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
      const fileData = fs.readFileSync(
        path.join(seasonPlanFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return seasonPlanList;
  } catch (error) {
    throw { code: "failedToListSeasonPlans", message: error.message };
  }
}

function updateUserTrickStatus(userId, trickId, finished) {
  try {
    const files = fs.readdirSync(seasonPlanFolderPath);
    for (const file of files) {
      const filePath = path.join(seasonPlanFolderPath, file);
      const fileData = fs.readFileSync(filePath, "utf8");
      const seasonPlan = JSON.parse(fileData);
      if (seasonPlan.userId === userId) {
        const updatedUserTrickList = seasonPlan.userTrickList.map((trick) => {
          if (trick.id === trickId) {
            return { ...trick, finished };
          }
          return trick;
        });
        seasonPlan.userTrickList = updatedUserTrickList;
        fs.writeFileSync(filePath, JSON.stringify(seasonPlan), "utf8");
        return { success: true };
      }
    }
    throw {
      code: "seasonPlanNotFound",
      message: `SeasonPlan for user ${userId} not found`,
    };
  } catch (error) {
    throw error;
  }
}

function updateAddOrRemoveTrick(userId, trickId, exists) {
  try {
    const files = fs.readdirSync(seasonPlanFolderPath);
    for (const file of files) {
      const filePath = path.join(seasonPlanFolderPath, file);
      const fileData = fs.readFileSync(filePath, "utf8");
      const seasonPlan = JSON.parse(fileData);
      if (seasonPlan.userId === userId) {
        let updatedUserTrickList;
        if (exists) {
          // Trick exists, remove it from userTrickList
          updatedUserTrickList = seasonPlan.userTrickList.filter(
            (trick) => trick.id !== trickId
          );
        } else {
          // Trick does not exist, add it to userTrickList
          updatedUserTrickList = [...seasonPlan.userTrickList, { id: trickId }];
        }
        seasonPlan.userTrickList = updatedUserTrickList;
        fs.writeFileSync(filePath, JSON.stringify(seasonPlan), "utf8");
        return { success: true };
      }
    }
    throw {
      code: "seasonPlanNotFound",
      message: `SeasonPlan for user ${userId} not found`,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  get,
  getUserTrickList,
  create,
  update,
  updateAddOrRemoveTrick,
  remove,
  list,
  updateUserTrickStatus,
};
