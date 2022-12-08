import NextAuth, { User } from "next-auth"
import { AdapterUser } from "next-auth/adapters";
import { JWT } from 'next-auth/jwt';;
 
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}


declare module "next-auth/jwt" {
    interface JWT {
      accessToken?: string;
      user?: User | AdapterUser
    }
  }
  