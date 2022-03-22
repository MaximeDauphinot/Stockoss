const mongoose = require("mongoose");

export const MONGODB_URI =
  "mongodb+srv://Dauph:Dauphin42@stockoss.6dchi.mongodb.net/Stockoss?retryWrites=true&w=majority";

export const db = mongoose.connect(MONGODB_URI);
