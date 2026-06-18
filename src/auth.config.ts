import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      credentials: {
        identifier: {},
        password: {},
      },

      async authorize() {
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
