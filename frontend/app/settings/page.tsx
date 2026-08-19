import AppLayout from "@/components/layout/AppLayout";

export default function SettingsPage() {
  return (
    <AppLayout title="Settings">
      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <h1 className="text-xl font-semibold text-gray-900">
          Settings
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Application settings will be available here.
        </p>
      </div>
    </AppLayout>
  );
}