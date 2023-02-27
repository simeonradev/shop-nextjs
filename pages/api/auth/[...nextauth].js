import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../mongodb";
import { ObjectId } from "mongodb";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "my-project",

      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials, "credentials");

        const client = await clientPromise;
        const db = client.db("didi-shop-db");

        const userExists = await db
          .collection("users")
          .findOne({ username: credentials.username });
        console.log(userExists, "asd");
        if (credentials.action === "loginUser") {
          if (userExists) {
            return userExists;
          }
        } else if (credentials.action === "createUser") {
          await db.collection("users").insertOne({
            username: credentials.username,
            password: credentials.password,
          });
          const newUser = await db
            .collection("users")
            .findOne({ username: credentials.username });
          return newUser;
        } else if (credentials.action === "updateUser") {
          if (userExists) {
            await db.collection("users").updateOne(
              { username: credentials.username },
              {
                $set: {
                  name: credentials.name,
                  age: credentials.age,
                  describtion: credentials.describtion,
                },
              }
            );

            console.log(credentials, "credentials");
            const updatedUser = await db
              .collection("users")
              .findOne({ username: credentials.username });
            return updatedUser;
          }
        } else if (credentials.action === "deleteUser") {
          if (userExists) {
            await db
              .collection("users")
              .deleteOne({ _id: ObjectId(`${userExists._id}`) });
          }
          return {};
        }
      },
    }),
  ],
  secret: "didko",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,

          username: user.username,
          age: user.age,
          describtion: user.describtion,

          accessToken: user.token,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {
      // session.user.accessToken = token.accessToken;
      // session.user.refreshToken = token.refreshToken;
      // session.user.accessTokenExpires = token.accessTokenExpires;

      session.user.username = token.username;
      session.user.age = token.age;
      session.user.describtion = token.describtion;

      console.log(session, "session");

      return session;
    },
  },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code #33FF5D
    logo: "/logo.png", // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
