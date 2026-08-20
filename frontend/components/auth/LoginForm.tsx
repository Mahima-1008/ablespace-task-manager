"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError(
        "Please enter your email and password.",
      );
      return;
    }

    try {
      setLoading(true);

      /*
       * Temporary client-side authentication.
       *
       * This gives the application a working login
       * flow without adding unnecessary backend
       * authentication complexity before the deadline.
       */
      localStorage.setItem(
        "ablespace_user",
        JSON.stringify({
          email: email.trim(),
          name:
            email
              .split("@")[0]
              .replace(/[._-]/g, " ")
              .replace(/\b\w/g, (letter) =>
                letter.toUpperCase(),
              ),
        }),
      );

      localStorage.setItem(
        "ablespace_authenticated",
        "true",
      );

      router.push("/tasks");
    } catch (err) {
      console.error(err);

      setError(
        "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleGuestLogin() {
    localStorage.setItem(
      "ablespace_user",
      JSON.stringify({
        email: "guest@ablespace.com",
        name: "Guest User",
      }),
    );

    localStorage.setItem(
      "ablespace_authenticated",
      "true",
    );

    router.push("/tasks");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Logo / heading */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              AbleSpace
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to manage your workspace
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Login form */}
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
                Email
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
                    setEmail(
                      event.target.value,
                    )
                  }
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-100"
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
                    setPassword(
                      event.target.value,
                    )
                  }
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-100"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Guest */}
          <button
            type="button"
            onClick={handleGuestLogin}
            className="flex h-11 w-full items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}