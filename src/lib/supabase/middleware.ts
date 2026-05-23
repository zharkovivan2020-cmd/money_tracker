import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseKey, getSupabaseUrl, hasSupabaseEnv } from "@/lib/supabase/env";

const AUTH_ROUTES = ["/login", "/register"];
const BLOCKED_ROUTE = "/blocked";

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.includes(pathname);
}

function isProtectedRoute(pathname: string) {
  if (pathname === "/") return true;
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/api/transactions")) return true;
  return false;
}

export async function updateSession(request: NextRequest) {
  if (!hasSupabaseEnv()) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  let isBlocked = false;
  let isAdmin = false;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_blocked, role")
      .eq("id", user.id)
      .maybeSingle();

    isBlocked = profile?.is_blocked === true;
    isAdmin = profile?.role === "admin" && !isBlocked;
  }

  if (!user && isProtectedRoute(pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (user && isBlocked && pathname !== BLOCKED_ROUTE) {
    const blockedUrl = request.nextUrl.clone();
    blockedUrl.pathname = BLOCKED_ROUTE;
    blockedUrl.search = "";
    return NextResponse.redirect(blockedUrl);
  }

  if (user && !isBlocked && pathname === BLOCKED_ROUTE) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  if (user && isAuthRoute(pathname)) {
    const targetUrl = request.nextUrl.clone();
    targetUrl.pathname = isBlocked ? BLOCKED_ROUTE : "/";
    targetUrl.search = "";
    return NextResponse.redirect(targetUrl);
  }

  if (user && pathname.startsWith("/admin") && !isAdmin) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  return supabaseResponse;
}
