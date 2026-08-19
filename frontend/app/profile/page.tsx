import AppLayout from "@/components/layout/AppLayout";

export default function ProfilePage() {
  return (
    <AppLayout title="Profile">
      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <h1 className="text-xl font-semibold text-gray-900">
          Profile
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Profile settings will be available here.
        </p>
      </div>
    </AppLayout>
  );
}