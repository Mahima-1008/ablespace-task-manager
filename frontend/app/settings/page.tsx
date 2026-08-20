"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";

type Theme = "light" | "dark" | "system";

export default function SettingsPage() {
  const [theme, setTheme] =
    useState<Theme>("light");

  const [notifications, setNotifications] =
    useState(true);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "ablespace_theme",
      ) as Theme | null;

    const savedNotifications =
      localStorage.getItem(
        "ablespace_notifications",
      );

    if (
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
    ) {
      setTheme(savedTheme);
    }

    if (savedNotifications !== null) {
      setNotifications(
        savedNotifications === "true",
      );
    }
  }, []);

  function handleSave() {
    localStorage.setItem(
      "ablespace_theme",
      theme,
    );

    localStorage.setItem(
      "ablespace_notifications",
      String(notifications),
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  return (
    <AppLayout title="Settings">
      <div className="flex justify-center">
        <div className="w-full max-w-3xl space-y-6">
          {/* Heading */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Settings
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your application preferences.
            </p>
          </div>

          {/* Appearance */}
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900">
                Appearance
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose how AbleSpace should look.
              </p>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-3">
              {/* Light */}
              <button
                type="button"
                onClick={() =>
                  setTheme("light")
                }
                className={`flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border text-sm transition ${
                  theme === "light"
                    ? "border-gray-900 bg-gray-50 text-gray-900"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Sun size={20} />

                <span>Light</span>

                {theme === "light" && (
                  <Check size={15} />
                )}
              </button>

              {/* Dark */}
              <button
                type="button"
                onClick={() =>
                  setTheme("dark")
                }
                className={`flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border text-sm transition ${
                  theme === "dark"
                    ? "border-gray-900 bg-gray-50 text-gray-900"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Moon size={20} />

                <span>Dark</span>

                {theme === "dark" && (
                  <Check size={15} />
                )}
              </button>

              {/* System */}
              <button
                type="button"
                onClick={() =>
                  setTheme("system")
                }
                className={`flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border text-sm transition ${
                  theme === "system"
                    ? "border-gray-900 bg-gray-50 text-gray-900"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Monitor size={20} />

                <span>System</span>

                {theme === "system" && (
                  <Check size={15} />
                )}
              </button>
            </div>
          </section>

          {/* Notifications */}
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage workspace notification preferences.
              </p>
            </div>

            <div className="flex items-center justify-between gap-5 p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <Bell
                    size={18}
                    className="text-gray-600"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Workspace notifications
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Receive notifications about task and project updates.
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={notifications}
                onClick={() =>
                  setNotifications(
                    !notifications,
                  )
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  notifications
                    ? "bg-gray-900"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    notifications
                      ? "left-5"
                      : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Save */}
          <div className="flex items-center justify-end gap-4">
            {saved && (
              <p className="text-sm text-green-600">
                Settings saved successfully.
              </p>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}