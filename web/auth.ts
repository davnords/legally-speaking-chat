import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
// import Email from 'next-auth/providers/email'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental // will be removed in future
} = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        if(!profile.id){
          token.id = profile.sub
        } else {
          token.id = profile.id
        }
        token.image = profile.picture
      }
      return token
    },
    /*authorized({ auth }) {
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }*/
  },
  pages: {
    signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  }
})
