import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/db/model/user";
import dbConnect from "@/config/dbConfig";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { loginUser } from "@/utils/cognito";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "email",
          type: "text",
          placeholder: "abc@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        try {
          const { email, password } = credentials;
          const myuser = await loginUser(email, password);
          if (myuser && myuser.idToken && myuser.idToken.payload) {
            const userData = {
              userId: myuser.idToken.payload.sub,
              email: myuser.idToken.payload.email,
              name: myuser.idToken.payload.name,
            };
            return userData;
          } else return null;
        } catch (err) {
          console.log("error inside authorize", err);
          return null;
        }
        // await dbConnect();
        // try {
        //   const { email, password } = credentials;
        //   console.log("credentials", credentials);
        //   const user = await User.findOne({ email });
        //   console.log(user);
        //   if (user) {
        //     const isPasswordCorrect = await bcrypt.compare(
        //       password,
        //       user.password
        //     );
        //     if (isPasswordCorrect) {
        //       return user;
        //     } else {
        //       throw new Error("Password is incorrect");
        //     }
        //   } else {
        //     throw new Error("No user found");
        //   }
        // } catch (error) {
        //   console.log("some error in authorize");
        //   throw new Error("Some error occured");
        // }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "credentials") {
        return true;
      }
      if (account?.provider == "google") {
        await dbConnect();
        try {
          const existingUser = await User.findOne({ email: profile.email });
          if (!existingUser) {
            const newUser = new User({
              name: profile.name,
              email: profile.email,
              provider: account.provider,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
      // console.log("signIn", user, account, profile, email, credentials);
      // await dbConnect();
      //   try {
      //     const user = await User.findOne({ email: user.email });
      //     if (!user) {
      //       const newUser = new User({
      //         email: user.email,
      //       });

      //       await newUser.save();
      //       return true;
      //     }
      //     return true;
      //   } catch (err) {
      //     console.log("Error saving user", err);
      //     return false;
      //   }
      // return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl; // Default to homepage
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("jwt", token, user, account, profile, isNewUser);
      return token;
    },
    async session({ session, token, user }) {
      if (session) {
        session.user = {
          name: token.name,
          email: token.email,
        };
      }
      // console.log("session", session, token, user);
      return session;
    },
  },
  pages: {
    signIn: "/en/login",
  },
};
