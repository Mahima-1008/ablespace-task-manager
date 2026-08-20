"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  onAdd?: () => void;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Application Area */}
      <div className="ml-64 min-h-screen">
        <main className="min-h-screen overflow-x-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}