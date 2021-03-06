import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  comments: [
    {
      auteur: {
        type: String,
      },
      commentaire: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Events", eventSchema);
