import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../mongodb";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "my-project",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          username: credentials.username,
          password: credentials.password,
        };
        console.log(payload);

        const client = await clientPromise;
        const db = client.db("didi-shop-db");

        const userExists = await db
          .collection("users")
          .findOne({ username: payload.username });
        console.log(userExists);
        if (userExists) {
          // res.status(409).json();
          return userExists;
        } else {
          await db.collection("users").insertOne({
            username: payload.username,
            password: payload.password,
            // name: user.name,
            // age: user.age,
            // describtion: user.describtion,
          });
          const newUser = await db
            .collection("users")
            .findOne({ username: payload.username });
          console.log(newUser);
          return { user: newUser };
        }
      },
    }),
    // ...add more providers here
  ],
  secret: "didko",
  pages: {
    signIn: "/loginNext",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
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
