import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: { signIn: '/portal/login' },
  callbacks: {
    async authorized({ token, req }) {
      const { pathname } = req.nextUrl;

      // Admin dashboard and client portal both require authentication.
      // Role-based authorization is enforced inside each page/action.
      if (pathname.startsWith('/admin') || pathname.startsWith('/portal')) {
        return !!token;
      }

      return true;
    },
  },
});

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*'],
};
