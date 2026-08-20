"use client";

import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import AuthGuard from "../auth/AuthGuard";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  onAdd?: () => void;
}

export default function AppLayout({
  children,
  title,
  onAdd,
}: AppLayoutProps) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            title={title}
            onAdd={onAdd}
          />

          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}