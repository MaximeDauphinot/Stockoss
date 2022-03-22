const multer = require("multer");
const db = require("../utils/database").db;

const cover = [
  {
    name: "cover",
  },
];

module.exports = {
  upload: multer({
    storage: db,
  }),
  coverEvent: cover,
};
