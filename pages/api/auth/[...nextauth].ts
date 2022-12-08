import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
        name: 'Custom Login',
        credentials: {
            email: { label: 'Correo', type: 'email', placeholder: 'correo@gmail.com' },
            passsword: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
        },
        async authorize(credentials, req) {
            
            return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.passsword )

            //Return null si falla
        }
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),

    GithubProvider({
        clientId: process.env.GITHUB_ID || '',
        clientSecret: process.env.GITHUB_SECRET || '',
    }),
    

  ],

  
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