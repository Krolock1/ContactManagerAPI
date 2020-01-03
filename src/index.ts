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

app.get("/quotes", (req, res) => {
  database.client
    .collection("quotes")
    .find()
    .toArray(function(err: MongoError, results: any[]) {
      console.log(results);
      res.send(results);
    });
});

app.post("/quotes", (req, res) => {
  console.log(`receive body ${JSON.stringify(req.body)} `);
  database.client
    .collection("quotes")
    .insertOne(req.body, (err: MongoError, result: WriteOpResult) => {
      if (err) {
        return console.log(err);
      }

      console.log(`saved to database ${JSON.stringify(result)}`);
      res.send((result as any).insertedId);
    });
});
