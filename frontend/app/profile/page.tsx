"use client";

import { useEffect, useState } from "react";
import { User, Mail, ShieldCheck } from "lucide-react";

interface UserData {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData>({
    name: "Guest User",
    email: "guest@ablespace.com",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("ablespace_user");

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);

        setUser({
          name: parsed.name || "Guest User",
          email:
            parsed.email ||
            "guest@ablespace.com",
        });
      } catch {
        // Keep default user information.
      }
    }
  }, []);

  function handleSave() {
    localStorage.setItem(
      "ablespace_user",
      JSON.stringify(user),
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information.
        </p>
      </div>

      {/* Profile card */}
      <div className="max-w-2xl rounded-xl border border-gray-200 bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-lg font-semibold text-white">
              {user.name
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                {user.name}
              </h2>

              <p className="text-sm text-gray-500">
                Workspace member
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5 p-6">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full name
            </label>

            <div className="relative">
              <User
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={user.name}
                onChange={(event) =>
                  setUser({
                    ...user,
                    name: event.target.value,
                  })
                }
                className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-900 outline-none focus:border-gray-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email address
            </label>

            <div className="relative">
              <Mail
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                value={user.email}
                onChange={(event) =>
                  setUser({
                    ...user,
                    email:
                      event.target.value,
                  })
                }
                className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-900 outline-none focus:border-gray-400"
              />
            </div>
          </div>

          {/* Account status */}
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
            <ShieldCheck
              size={18}
              className="text-gray-600"
            />

            <div>
              <p className="text-sm font-medium text-gray-900">
                Account active
              </p>

              <p className="text-xs text-gray-500">
                Your AbleSpace account is active.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 p-6">
          <p className="text-sm text-green-600">
            {saved ? "Profile saved." : ""}
          </p>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}