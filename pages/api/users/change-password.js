import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connect } from "../../../lib/dbConnection";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }
  console.log(req.body);
  const session = await getSession({ req: req });
  if (!session) {
    res.status(401).json({ err: "Not authenticated!" });
    return;
  }
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const client = await connect();
  const db = client.db();
  const data = await db.collection("users").findOne({ email: userEmail });
  if (!data) {
    res.status(404).json({ err: "User not found" });
    client.close();
    return;
  }
  const correct = await verifyPassword(oldPassword, data.password);
  if (!correct) {
    res.status(403).json({ err: "Invalid password" });
    client.close();
    return;
  }
  const newHashed = await hashPassword(newPassword);
  await db
    .collection("users")
    .updateOne({ email: userEmail }, { $set: { password: newHashed } });
  client.close();
  res.status(200).json({ message: "Password updated!!" });
};

export default handler;
