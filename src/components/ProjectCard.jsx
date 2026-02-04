import { Link } from "react-router-dom";

export default function ProjectCard() {
  return (
    <>
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">
              Jane Cooper
            </h3>
            <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Admin
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">
            Regional Paradigm Technician
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
          alt="Jane Cooper"
          className="h-10 w-10 shrink-0 rounded-full bg-gray-300"
        />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href="mailto:janecooper@example.com"
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              Delete
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <Link
              to="/user/projects/11/edit"
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
