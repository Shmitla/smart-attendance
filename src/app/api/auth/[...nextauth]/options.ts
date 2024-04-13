//@ts-nocheck
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const loginURL = process.env.NEXT_PUBLIC_HOSTNAME + "login";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    /*GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
    }),*/
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username:{label:"Username", type:"text",placeholder:"enter your username"},
        email: { label: "Email", type: "email", placeholder: "enter your email" },
        password: { label: "Password", type: "password",placeholder: "enter your password" },
      },
      async authorize(credentials, req) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const requestBody = {
          email: credentials.email,
          password: credentials.password,
        };
        const res = await fetch(loginURL, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" },
        });
        const resdata = await res.json();
        if (resdata.status === 200 || resdata.status === 201) {
          return {...resdata.data, name: resdata.data.username};
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    // signIn: "/",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    async jwt({ token, user }) { // token is default, user is the result of provider
      console.log('getting jwt', token, user)
      // the user present here gets the same data as received from DB call  made above -> fetchUserInfo(credentials.opt)
      return { ...token, user, ...(user && {name: user.username}) };
    },
    async session({ session, user, token }) {
      console.log('getting session', { session, user, token })
      // user param present in the session(function) does not recive all the data from DB call -> fetchUserInfo(credentials.opt)
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};