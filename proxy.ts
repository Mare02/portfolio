import { NextResponse, type NextRequest } from "next/server";
import { preferredLocale } from "./lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // English keeps its existing unprefixed URLs; Serbian keeps /sr.
  // Next also resolves the rewritten English path through this proxy. Let it
  // reach the App Router rather than redirecting it back to the public URL.
  if (/^\/en(?:\/|$)/.test(pathname)) {
    const headers = new Headers(request.headers);
    headers.set("x-site-locale", "en");
    return NextResponse.next({ request: { headers } });
  }
  const isSerbian = /^\/sr(?:\/|$)/.test(pathname);
  if (
    pathname === "/" &&
    preferredLocale(request.headers.get("accept-language")) === "sr" &&
    request.cookies.get("site-locale")?.value !== "en"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/sr";
    return NextResponse.redirect(url, 307);
  }
  const headers = new Headers(request.headers);
  headers.set("x-site-locale", isSerbian ? "sr" : "en");
  if (isSerbian) return NextResponse.next({ request: { headers } });
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}
export const config = {
  matcher: ["/((?!api|_next|favicon.ico|images/|svg-icons/|techLogos/).*)"],
};
