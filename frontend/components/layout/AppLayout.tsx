"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  onAdd?: () => void;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const authenticated =
      localStorage.getItem("ablespace_auth") === "true";

    if (!authenticated) {
      router.replace("/login");
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">
          Loading AbleSpace...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="ml-64">
        <main className="px-6 py-6">
          <div className="w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}