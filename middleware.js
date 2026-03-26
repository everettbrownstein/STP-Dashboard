export const config = {
  matcher: '/:path*',
};

export default function middleware(request) {
  const auth = request.headers.get('authorization') ?? '';
  const [scheme, encoded] = auth.split(' ');

  if (scheme === 'Basic' && encoded) {
    const decoded = atob(encoded);
    const colon = decoded.indexOf(':');
    const user = decoded.slice(0, colon);
    const pass = decoded.slice(colon + 1);

    if (
      user === process.env.AUTH_USERNAME &&
      pass === process.env.AUTH_PASSWORD
    ) {
      return; // authenticated — pass through to the page
    }
  }

  return new Response('Access denied', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="STP Dashboard"' },
  });
}
