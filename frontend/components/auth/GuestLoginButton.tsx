"use client";

import { useRouter } from "next/navigation";

export default function GuestLoginButton() {
  const router = useRouter();

  const handleGuestLogin = () => {
    localStorage.setItem("ablespace_guest", "true");

    router.push("/tasks");
  };

  return (
    <button
      type="button"
      onClick={handleGuestLogin}
      className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
    >
      Continue as Guest
    </button>
  );
}