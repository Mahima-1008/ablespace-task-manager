interface ProjectDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-8">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Project
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-gray-900">
            Project {id}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Project details will be available here.
          </p>
        </div>
      </div>
    </div>
  );
}