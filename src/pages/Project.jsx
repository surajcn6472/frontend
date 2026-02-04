import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { deleteProject, fetchProjects } from "../store/slices/projectsSlice";
import Modal from "../components/Modal";
import { createPortal } from "react-dom";

export default function Project() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [deletingProjectId, setDeletingProjectId] = useState(null);

  const { projects, loading, error, pagination } = useSelector(
    (state) => state.projects,
  );

  const deleteActionHandler = (value) => {
    handleDelete(value);
    setDeletingProjectId(null);
  };

  // Local state for form inputs
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
    sortBy: searchParams.get("sortBy") || "",
    order: searchParams.get("order") || "",
  });

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Fetch projects when filters or page changes
  useEffect(() => {
    const params = {
      page: currentPage,
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== ""),
      ),
    };

    // Dispatch your Redux action here
    dispatch(fetchProjects(params));
  }, [dispatch, currentPage, filters]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set("page", "1");
    setSearchParams(params);
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (e, reset = false) => {
    if (reset) {
      setFilters({
        search: "",
        status: "",
        sortBy: "",
        order: "",
      });
      setSearchParams({});
      return;
    }

    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    const params = new URLSearchParams(searchParams);
    setSearchParams(params);
  };

  // Handle page change
  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  // Handle delete
  const handleDelete = (projectId) => {
    dispatch(
      deleteProject({
        id: projectId,
        params: Object.fromEntries(searchParams.entries()),
      }),
    );
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Projects</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the projects their name, start date, end date, rate,
              status and owner profile pics.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              to="/user/projects/create"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add project
            </Link>
          </div>
        </div>
        {/* Filters */}
        <form className="flex gap-3 mt-5">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search for the tool you like"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="finished">Finished</option>
          </select>

          <select
            id="sortBy"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Sort By</option>
            <option value="rate">Rate</option>
            <option value="name">Name</option>
            <option value="startDate">Start Date</option>
            <option value="endDate">End Date</option>
          </select>

          <select
            id="order"
            name="order"
            value={filters.order}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Sort Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button
            type="button"
            onClick={(e) => handleFilterChange(e, true)}
            className="flex items-center border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-600 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Reset
          </button>
        </form>
        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg">Loading projects...</div>
          </div>
        ) : (
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                {projects && projects.length > 0 ? (
                  <ul
                    role="list"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {projects.map((project) => (
                      <li
                        key={project.id}
                        className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                      >
                        <div className="flex w-full items-start justify-between space-x-6 p-6">
                          <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                              <h3 className="truncate text-sm font-medium text-gray-900">
                                {project.name}
                              </h3>
                              <span
                                className={`inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                                  project.status === "finished"
                                    ? "bg-green-50 text-green-700 ring-green-600/20"
                                    : project.status === "in-progress"
                                      ? "bg-blue-50 text-blue-700 ring-blue-600/20"
                                      : "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
                                }`}
                              >
                                {project.status.toUpperCase()}
                              </span>
                            </div>
                            <p className="mt-1 truncate text-sm text-gray-500">
                              <span className="font-bold">Rate</span>: $
                              {project.rate}/hr
                            </p>
                            <div className="mt-2 text-xs text-gray-500 flex gap-2">
                              <span>
                                <span className="font-bold">Start Date</span>:{" "}
                                {project.startDate}
                              </span>
                              <span>
                                <span className="font-bold">End Date</span>:{" "}
                                {project.endDate}
                              </span>
                            </div>
                          </div>
                          {project.owner?.profileImage && (
                            <img
                              src={
                                import.meta.env.VITE_API_BASE_URL +
                                project.owner.profileImage
                              }
                              alt={project.owner.name}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src =
                                  "https://placehold.net/main.svg";
                              }}
                              className="h-10 w-10 shrink-0 rounded-full bg-gray-300"
                            />
                          )}
                        </div>
                        <div>
                          <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="flex w-0 flex-1">
                              <button
                                onClick={() => setDeletingProjectId(project.id)}
                                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-red-600 hover:bg-gray-50"
                              >
                                Delete
                              </button>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                              <Link
                                to={`/user/projects/${project.id}/edit`}
                                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                              >
                                Edit
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No projects found</p>
                  </div>
                )}

                {!!deletingProjectId &&
                  createPortal(
                    <Modal
                      open={!!open}
                      onClose={() => setOpen(false)}
                      onAction={() => deleteActionHandler(deletingProjectId)}
                    />,
                    document.getElementById("modal"),
                  )}
                <Pagination
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                  hasNextPage={pagination.hasNextPage}
                  hasPrevPage={pagination.hasPrevPage}
                  onPageChange={handlePageChange}
                  className="mt-5"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
