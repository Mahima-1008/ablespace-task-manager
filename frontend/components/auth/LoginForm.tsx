import GuestLoginButton from "./GuestLoginButton";

export default function LoginForm() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-xl font-bold text-white">
              P
            </div>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Let&apos;s get back
            <br />
            on track
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Sign in to continue to your workspace
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>

            <GuestLoginButton />

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium transition hover:bg-gray-50"
            >
              <span className="font-bold">G</span>
              Continue with Google
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4 text-xs text-gray-400">
          <button type="button" className="hover:text-gray-600">
            Terms of Service
          </button>

          <span>•</span>

          <button type="button" className="hover:text-gray-600">
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}