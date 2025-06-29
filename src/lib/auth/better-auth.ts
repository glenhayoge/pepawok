import { BetterAuth } from 'better-auth';
import { PrismaAdapter } from 'better-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const auth = new BetterAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Add credentials provider for email/password
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { id: true, email: true, role: true, agency: true }
        });
        if (user) session.user = user;
      }
      return session;