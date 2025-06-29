import { BetterAuth } from 'better-auth';

export const auth = new BetterAuth({
  databaseAdapter: 'prisma',
  prismaInstance: prisma,
  providers: [
    {
      id: 'credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        return user && bcrypt.compare(credentials.password, user.password) 
          ? { id: user.id, email: user.email, role: user.role }
          : null;
      }
    }
  ],
  session: { maxAge: 30 * 24 * 60 * 60 }, // 30 days
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) token.role = user.role;
      return token;
    },
    session: ({ session, token }) => {
      session.user.role = token.role;
      return session;
    }
  }
});