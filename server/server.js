const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

const groupController = require("./controller/group");
const seasonPlanController = require("./controller/seasonPlan");
const trickController = require("./controller/trick");
const userController = require("./controller/user");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/group", groupController);
app.use("/seasonPlan", seasonPlanController);
app.use("/trick", trickController);
app.use("/user", userController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
