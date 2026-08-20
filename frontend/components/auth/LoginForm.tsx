"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckSquare, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authenticated =
      localStorage.getItem("ablespace_auth") === "true";

    if (authenticated) {
      router.replace("/");
    }
  }, [router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    localStorage.setItem("ablespace_auth", "true");

    localStorage.setItem(
      "ablespace_user",
      JSON.stringify({
        name: "Mahima",
        email: email.trim(),
      }),
    );

    router.replace("/");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white">
            <CheckSquare size={24} />
          </div>

          <h1 className="mt-4 text-2xl font-semibold text-gray-900">
            Welcome to AbleSpace
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to manage your workspace.
          </p>
        </div>

        {/* Login card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-gray-400">
            Demo login — enter any email and password.
          </p>
        </div>
      </div>
    </main>
  );
}