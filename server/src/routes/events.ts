const express = require("express");

const events = require("../controllers/events");
const { upload, coverEvent } = require("../middleware/multer");

const router = express.Router();

router.get("/events", events.getEvents);

router.post("/add-event", upload.single(coverEvent), events.addEvent);

router.post("/event/:id", events.getOneEvent);

module.exports = router;
