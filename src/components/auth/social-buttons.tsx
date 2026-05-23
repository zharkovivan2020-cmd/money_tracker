"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

type OAuthProvider = "google" | "github";

const LABELS: Record<OAuthProvider, string> = {
  google: "Войти через Google",
  github: "Войти через GitHub",
};

export function SocialButtons() {
  const [loading, setLoading] = useState<OAuthProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function signInWith(provider: OAuthProvider) {
    setLoading(provider);
    setError(null);

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback`;

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });

    if (oauthError) {
      setError(oauthError.message);
      setLoading(null);
    }
  }

  return (
    <div className="grid gap-2">
      {(Object.keys(LABELS) as OAuthProvider[]).map((provider) => (
        <Button
          key={provider}
          type="button"
          variant="outline"
          className="w-full"
          disabled={loading !== null}
          onClick={() => signInWith(provider)}
        >
          {loading === provider ? "Перенаправление…" : LABELS[provider]}
        </Button>
      ))}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
