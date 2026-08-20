"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] =
    useState(true);

  useEffect(() => {
    const authenticated =
      localStorage.getItem(
        "ablespace_authenticated",
      ) === "true";

    if (!authenticated) {
      router.replace(
        `/login?redirect=${encodeURIComponent(
          pathname,
        )}`,
      );

      return;
    }

    setChecking(false);
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}