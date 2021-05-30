import { MongoClient } from "mongodb";

const connect = async () => {
  const client = await MongoClient.connect(
    "mongo db url",
    { useUnifiedTopology: true }
  );
  return client;
};

export { connect };
