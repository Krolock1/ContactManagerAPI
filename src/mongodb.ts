import MongoClient, { Db } from "mongodb";

const database: { client?: Db } = {};
const init = () => {
  const dbUri =
    "mongodb+srv://markus:markus@contacts-nc4cl.mongodb.net/test?retryWrites=true&w=majority";
  MongoClient.connect(dbUri, (err, client) => {
    if (err) {
      return console.log(err);
    }
    database.client = client.db("contacts");
  });
};
init();
export default database;
