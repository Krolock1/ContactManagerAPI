import express from "express";

import database from "../mongodb";
import { MongoError, WriteOpResult } from "mongodb";

const router = express.Router();
const collectionName = "contacts";
// GET
router.get("/", (req, res, next) => {
  database.client
    .collection(collectionName)
    .find()
    .toArray(function(err: MongoError, results: any[]) {
      console.log(results);
      res.send(results);
    });
});

// CREATE
router.post("/", (req, res) => {
  console.log("create");
  console.log(req.body);
  var data = req.body;
  // if (data == {}) {
  data = { name: "Markus" };
  console.log(`use ${data} as data`);
  // }
  database.client
    .collection(collectionName)
    .insertOne(data, (err: MongoError, result: WriteOpResult) => {
      if (err) {
        return console.log(err);
      }

      console.log("saved to database");
      res.redirect("/");
    });
});

// DELETE
router.delete("/", (req, res) => {
  console.log("deleted");
  res.json({ msg: "OK" });
});

export default router;
