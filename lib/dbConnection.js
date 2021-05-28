import { MongoClient } from "mongodb";

const connect = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://new-user123:new-user123@cluster0.ozhsq.mongodb.net/next-auth?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  );
  return client;
};

export { connect };
