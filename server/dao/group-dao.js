const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const groupFolderPath = path.join(__dirname, "storage", "groupList");

// Method to read an group from a file
function get(groupId) {
  try {
    const filePath = path.join(groupFolderPath, `${groupId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadGroup", message: error.message };
  }
}

// Method to write an group to a file
function create(group) {
  try {
    group.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(groupFolderPath, `${group.id}.json`);
    const fileData = JSON.stringify(group);
    fs.writeFileSync(filePath, fileData, "utf8");
    return group;
  } catch (error) {
    throw { code: "failedToCreateGroup", message: error.message };
  }
}

// Method to update group in a file
function update(group) {
  try {
    const currentGroup = get(group.id);
    if (!currentGroup) return null;
    const newGroup = { ...currentGroup, ...group };
    const filePath = path.join(groupFolderPath, `${group.id}.json`);
    const fileData = JSON.stringify(newGroup);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newGroup;
  } catch (error) {
    throw { code: "failedToUpdateGroup", message: error.message };
  }
}

// Method to remove an group from a file
function remove(groupId) {
  try {
    const filePath = path.join(groupFolderPath, `${groupId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveGroup", message: error.message };
  }
}

// Method to list groups in a folder
function list() {
  try {
    const files = fs.readdirSync(groupFolderPath);
    const groupList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(groupFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return groupList;
  } catch (error) {
    throw { code: "failedToListGroups", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
