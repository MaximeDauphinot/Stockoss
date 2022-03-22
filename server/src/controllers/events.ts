import { json } from "body-parser";
import { Request, Response, NextFunction } from "express";
import { EventDatas } from "../types/event";

const Events = require("../models/events");

const events = [
  {
    title: "testEvent",
  },
  {
    title: "testEvent",
  },
  {
    title: "testEvent",
  },
  {
    title: "testEvent",
  },
  {
    title: "testEvent",
  },
  {
    title: "testEvent",
  },
  {
    title: "testEvent",
  },
  {
    title: "testEvent",
  },
  {
    title: "testEvent",
  },
  {
    title: "testEvent",
  },
];

exports.getEvents = (req: Request, res: Response, next: NextFunction) => {
  Events.find()
    .then((events: EventDatas) => {
      res.send(events);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

exports.addEvent = (req: Request, res: Response, next: NextFunction) => {
  const title = req.body.title;
  const description = req.body.description;
  const email = req.body.email;
  const date = req.body.date;
  const cover = req.body.cover;

  const event = new Events({
    title: title,
    description: description,
    email: email,
    date: date,
    cover: cover,
  });

  event
    .save()
    .then((result: any) => {
      console.log("Created Product");
    })
    .catch((err: any) => {
      console.log(err);
    });
};

exports.getOneEvent = (req: Request, res: Response, next: NextFunction) => {
  res.send({
    path: "/a-propos",
  });
};

// http://localhost:5000/
