import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
        name: 'Custom Login',
        type: 'credentials',
        credentials: {
            // email: { label: 'Correo', type: 'email' },
            // passsword: { label: 'Contraseña', type: 'password' },
        },
        async authorize(credentials, req) {

            const { email, password } = credentials as { email: string, password: string }
            
            return await dbUsers.checkUserEmailPassword( email, password )

            //Return null si falla
        }
    }),

    GithubProvider({
        clientId: process.env.GITHUB_ID || '',
        clientSecret: process.env.GITHUB_SECRET || '',
    }),

    GoogleProvider({
        clientId: process.env.GOOGLE_ID || '',
        clientSecret: process.env.GOOGLE_SECRET || ''
    }),

  ],

  // Custom Pagse
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  session: {
    maxAge: 2592000, // 30 dias
    strategy: 'jwt',
    updateAge: 86400, // Cada dia se actualiza el token
  },
  
  callbacks: {
  
    // Manejando el token, añadiendo las opciones personalizadas
    async jwt({ token, account, user }) {
      // console.log({token, account, user})

      if ( account ) {
        token.accessToken = account.access_token;

        switch ( account.type ) {
          case 'oauth':
            // Verificar autenticacion y crear usuario si no existe en la db
            token.user = await dbUsers.oAuthToDbUser( user?.email || '', user?.name || '' )
            break;

          case 'credentials':
            token.user = user;
            break;

          default:
            break;
        }

      }

      return token;
    },


    // La session que se va a regresar en el hook useSession
    async session({ session, token, user }){
      
      session.accessToken = token.accessToken;
      session.user = token.user;

      // console.log({session})
      
      return session;
    }

  },



};


export default NextAuth(authOptions)