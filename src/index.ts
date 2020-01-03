import bodyParser from "body-parser";
import express from "express";
import MongoClient, { MongoError, WriteOpResult } from "mongodb";
import contacts from "./routes/contacts";
import database from "./mongodb";

const app = express();
const port = 3000; // default port to listen

app.use(bodyParser());

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

app.use("/api/v1/contacts", contacts);

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});
