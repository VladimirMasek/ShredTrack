const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const trickFolderPath = path.join(__dirname, "storage", "trickList");

// Method to read an trick from a file
function get(trickId) {
  try {
    const filePath = path.join(trickFolderPath, `${trickId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadTrick", message: error.message };
  }
}

// Method to write an trick to a file
function create(trick) {
  try {
    trick.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(trickFolderPath, `${trick.id}.json`);
    const fileData = JSON.stringify(trick);
    fs.writeFileSync(filePath, fileData, "utf8");
    return trick;
  } catch (error) {
    throw { code: "failedToCreateTrick", message: error.message };
  }
}

// Method to update trick in a file
function update(trick) {
  try {
    const currentTrick = get(trick.id);
    if (!currentTrick) return null;
    const newTrick = { ...currentTrick, ...trick };
    const filePath = path.join(trickFolderPath, `${trick.id}.json`);
    const fileData = JSON.stringify(newTrick);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newTrick;
  } catch (error) {
    throw { code: "failedToUpdateTrick", message: error.message };
  }
}

// Method to remove an trick from a file
function remove(trickId) {
  try {
    const filePath = path.join(trickFolderPath, `${trickId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveTrick", message: error.message };
  }
}

// Method to list tricks in a folder
function list() {
  try {
    const files = fs.readdirSync(trickFolderPath);
    const trickList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(trickFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return trickList;
  } catch (error) {
    throw { code: "failedToListTricks", message: error.message };
  }
}

function listByFeatureAndDifficulty(feature, difficulty) {
  try {
    const files = fs.readdirSync(trickFolderPath);
    const trickList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(trickFolderPath, file),
        "utf8"
      );
      const trick = JSON.parse(fileData);
      if (trick.feature === feature && trick.difficulty === difficulty) {
        return trick;
      }
      return null;
    });
    return trickList.filter((trick) => trick !== null);
  } catch (error) {
    throw { code: "failedToListTricks", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  listByFeatureAndDifficulty,
};
