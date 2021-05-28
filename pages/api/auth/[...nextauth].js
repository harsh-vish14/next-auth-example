import NextAuth from "next-auth";
import Provider from "next-auth/providers";
import { connect } from "../../../lib/dbConnection";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Provider.Credentials({
      async authorize(credentials) {
        const client = await connect();
        const usersCollection = await client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error("No user found!");
        }
        const isCorrect = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isCorrect) {
          client.close();
          throw new Error("Invalid password");
        }
        client.close();
        return {
          email: user.email,
          phone: "9322224994",
          bio: "this is simple bio example",
        };
      },
    }),
  ],
});
