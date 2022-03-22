import express from "express";
import { db, MONGODB_URI } from "./utils/database";

var cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(cors());

const eventRoutes = require("./routes/events");

app.use(eventRoutes);

db.then((result: any) => {
  app.listen(port);
  console.log("Database connected");
}).catch((err: any) => {
  console.log(err);
});
