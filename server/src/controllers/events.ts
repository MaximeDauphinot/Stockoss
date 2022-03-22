import { json } from "body-parser";
import { Request, Response, NextFunction } from "express";
import { EventDatas } from "../types/event";

const Events = require("../models/events");

exports.getEvents = (req: Request, res: Response, next: NextFunction) => {
  Events.find()
    .then((events: EventDatas[]) => {
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

exports.addComment = (req: Request, res: Response, next: NextFunction) => {
  const { auteur, commentaire } = req.body;
  const id = req.params.id;

  console.log(req.body);

  Events.findById(id)
    .then((event: any) => {
      event.comments.push({
        auteur: auteur,
        commentaire: commentaire,
      });

      return event.save();
    })
    .then((result: any) => {
      console.log("UPDATED PRODUCT!");
    })
    .catch((err: any) => {
      console.log(err);
    });
};

exports.getOneEvent = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  Events.findById(id)
    .then((event: EventDatas) => {
      res.send(event);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
