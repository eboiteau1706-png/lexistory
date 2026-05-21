import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
 
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  console.log("Auth callback:", { code: !!code, token_hash: !!token_hash, type });
 
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
 
  if (token_hash && type) {
  const { error } = await supabase.auth.verifyOtp({ token_hash, type: type as any });
  console.log("verifyOtp result:", { error: error?.message, type });
  
  if (!error) {
    if (type === "signup") {
      return NextResponse.redirect(`${origin}/compte-confirme`);
    }
    if (type === "recovery") {
      return NextResponse.redirect(`${origin}/reset-password`);
    }
    if (type === "email_change") {
      return NextResponse.redirect(`${origin}/profile?emailUpdated=1`);
    }
  }
}

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    return NextResponse.redirect(`${origin}/`);
  }
 
  return NextResponse.redirect(`${origin}/`);
}