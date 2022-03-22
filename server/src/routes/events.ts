const express = require("express");

const events = require("../controllers/events");

const router = express.Router();

router.get("/events", events.getEvents);

router.post("/add-event", events.addEvent);

router.post("/add-comment/:id", events.addComment);

router.get("/event/:id", events.getOneEvent);

module.exports = router;
