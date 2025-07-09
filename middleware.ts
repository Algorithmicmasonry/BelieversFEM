import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { rootDomain } from '@/lib/utils'; // Assuming rootDomain is crucial for subdomain logic

type Session = typeof auth.$Infer.Session;

// Helper function for subdomain extraction (from the second middleware)
function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];

  // Local development environment
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    // Fallback to host header approach
    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }

    return null;
  }

  // Production environment
  const rootDomainFormatted = rootDomain.split(':')[0];

  // Handle preview deployment URLs (tenant---branch-name.vercel.app)
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Regular subdomain detection
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = extractSubdomain(request);

  // --- Subdomain Logic (from the second middleware) ---
  if (subdomain) {
    // Block access to admin page from subdomains
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // For the root path on a subdomain, rewrite to the subdomain page
    if (pathname === '/') {
      // It's important to do rewrites *before* authentication checks if
      // the rewritten path itself needs authentication.
      return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
    }
  }

  // --- Authentication Logic (from the first middleware) ---
  // Apply this only to the dashboard route as per its original config
  if (pathname === '/dashboard') {
    const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
      },
    });

    if (!session) {
      return NextResponse.redirect(new URL("register", request.url));
    }
  }

  // If no specific conditions are met, proceed to the next handler
  return NextResponse.next();
}

export const config = {
  // Combine matchers. The more restrictive matcher should come first if there's overlap
  // and you want it to take precedence.
  // In this case, the broader subdomain matcher includes /dashboard, so we need to be careful.
  // The subdomain matcher '/((?!api|_next|[\\w-]+\\.\\w+).*)' will match almost everything.
  // The '/dashboard' matcher is a subset.
  // We can keep the broader matcher and handle the '/dashboard' specific logic inside the middleware.
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     * This matcher covers both original use cases.
     */
    '/((?!api|_next|[\\w-]+\\.\\w+).*)'
  ]
};