import { connect } from "../../../lib/dbConnection";
import { hashPassword } from "../../../lib/auth";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = JSON.parse(req.body);

    if (
      !email ||
      !password ||
      !email.includes("@") ||
      password.trim().length < 7
    ) {
      res.status(422).json({ err: "Invalid input" });
      return;
    }
    const client = await connect();
    const db = client.db();
    const userPresent = await db.collection("users").findOne({ email });
    if (userPresent) {
      res.status(422).json({ err: "User already exists" });
      return;
    }
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    const result = await db
      .collection("users")
      .insertOne({ email, password: hashedPassword });
    res.status(201).json({ message: "User inserted" });
  }
};

export default handler;
