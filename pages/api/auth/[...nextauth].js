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
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("didi-shop-db");

        const userExists = await db
          .collection("users")
          .findOne({ username: credentials.username });
        if (credentials.action === "loginUser") {
          if (userExists) {
            return userExists;
          }
        } else if (credentials.action === "createUser") {
          if (userExists) {
            return null;
          } else {
            await db.collection("users").insertOne({
              username: credentials.username,
              password: credentials.password,
              isAdmin: false,
            });
            const newUser = await db
              .collection("users")
              .findOne({ username: credentials.username });
            return newUser;
          }
        } else if (credentials.action === "updateUser") {
          if (userExists) {
            await db.collection("users").updateOne(
              { username: credentials.username },
              {
                $set: {
                  name: credentials.name,
                  age: credentials.age,
                  describtion: credentials.describtion,
                  isAdmin: credentials.isAdmin === "true" ? true : false,
                },
              }
            );

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

          id: user._id,
          username: user.username,
          age: user.age,
          describtion: user.describtion,
          isAdmin: user.isAdmin,

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

      session.user.id = token.id;
      session.user.username = token.username;
      session.user.age = token.age;
      session.user.describtion = token.describtion;
      session.user.isAdmin = token.isAdmin;

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
