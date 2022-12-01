import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
        name: 'Custom Login',
        credentials: {
            email: { label: 'Correo', type: 'email', placeholder: 'correo@gmail.com' },
            passsword: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
        },
        async authorize(credentials, req): Promise<any> {
            console.log({credentials})

            return { name: 'Juan', correo: 'juan@gmail.com', role: 'admin' };
        }
    }),

    GithubProvider({
        clientId: process.env.GITHUB_ID || '',
        clientSecret: process.env.GITHUB_SECRET || '',
      }),
  ],



  callbacks: {
    
  }

}
export default NextAuth(authOptions)