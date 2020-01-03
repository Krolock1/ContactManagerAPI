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
  console.log(`receive body ${JSON.stringify(req.body)} `);
  database.client
    .collection(collectionName)
    .insertOne(req.body, (err: MongoError, result: any) => {
      if (err) {
        return console.log(err);
      }
      const insertId = result.insertedId;
      console.log(`saved to database with id ${insertId}`);
      res.send(insertId);
    });
});

// DELETE
router.delete("/", (req, res) => {
  console.log("deleted");
  res.json({ msg: "OK" });
});

export default router;
