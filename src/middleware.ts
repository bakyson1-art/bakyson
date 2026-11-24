import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: { signIn: '/portal' },
  callbacks: {
    async authorized({ token, req }) {
      const { pathname } = req.nextUrl;

      // `/portal` itself is the public sign-in page, so only the pages below it
      // are protected. The staff dashboard lives in a separate application.
      if (pathname.startsWith('/portal/')) {
        return !!token;
      }

      return true;
    },
  },
});

export const config = {
  // `:path+` matches one or more segments, leaving `/portal` itself public.
  matcher: ['/portal/:path+'],
};
