const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const userFolderPath = path.join(__dirname, "storage", "userList");

// Method to read an user from a file
function get(userId) {
  try {
    const filePath = path.join(userFolderPath, `${userId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadUser", message: error.message };
  }
}

// Method to write an user to a file
function create(user) {
  try {
    user.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(userFolderPath, `${user.id}.json`);
    const fileData = JSON.stringify(user);
    fs.writeFileSync(filePath, fileData, "utf8");
    return user;
  } catch (error) {
    throw { code: "failedToCreateUser", message: error.message };
  }
}

// Method to update user in a file
function update(user) {
  try {
    const currentUser = get(user.id);
    if (!currentUser) return null;
    const newUser = { ...currentUser, ...user };
    const filePath = path.join(userFolderPath, `${user.id}.json`);
    const fileData = JSON.stringify(newUser);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newUser;
  } catch (error) {
    throw { code: "failedToUpdateUser", message: error.message };
  }
}

// Method to remove an user from a file
function remove(userId) {
  try {
    const filePath = path.join(userFolderPath, `${userId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveUser", message: error.message };
  }
}

// Method to list users in a folder
function list() {
  try {
    const files = fs.readdirSync(userFolderPath);
    const userList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(userFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    userList.sort((a, b) => b.points - a.points);
    return userList;
  } catch (error) {
    throw { code: "failedToListUsers", message: error.message };
  }
}

function updateAddOrSubtractPoints(userId, points, addOrSubtract) {
  try {
    // Retrieve the current user
    const currentUser = get(userId);
    if (!currentUser) return null;
    const newPoints = addOrSubtract
      ? currentUser.points + points
      : currentUser.points - points;
    const updatedPoints = Math.max(newPoints, 0);
    const updatedUser = { ...currentUser, points: updatedPoints };
    const filePath = path.join(userFolderPath, `${userId}.json`);
    const fileData = JSON.stringify(updatedUser);
    fs.writeFileSync(filePath, fileData, "utf8");
    return updatedUser;
  } catch (error) {
    throw { code: "failedToUpdateUser", message: error.message };
  }
}

function getUserListByIds(members) {
  try {
    const userList = [];
    for (const memberId of members) {
      const user = get(memberId);
      if (user) {
        userList.push(user);
      }
    }
    userList.sort((a, b) => b.points - a.points);
    return userList;
  } catch (error) {
    throw { code: "failedToGetUserList", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  updateAddOrSubtractPoints,
  getUserListByIds,
};
