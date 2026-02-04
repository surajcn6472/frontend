import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

export default function Project() {
  return (
    <div class="mx-auto max-w-7xl">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold text-gray-900">Projects</h1>
            <p class="mt-2 text-sm text-gray-700">
              A list of all the projects their name, start date, end date, rate,
              status and owner profile pics.
            </p>
          </div>
          <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              to="/user/projects/create"
              type="button"
              class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add project
            </Link>
          </div>
        </div>
        <form class="flex gap-3 mt-5">
          <input
            type="text"
            placeholder="Search for the tool you like"
            class="border rounded px-2"
          />

          <select id="status" name="status" class="border rounded px-2">
            <option value="" selected="">
              Status
            </option>
            <option value="pending">pending</option>
            <option value="in-progress">In Progress</option>
            <option value="finished">Finished</option>
          </select>
          <select id="sortBy" name="sortBy" class="border rounded px-2">
            <option value="All" selected="">
              Sort By
            </option>
            <option value="Freemium">Rate</option>
            <option value="Free">Name</option>
          </select>
          <select id="order" name="order" class="border rounded px-2">
            <option value="" selected="">
              Sort Order
            </option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </form>

        <div class="mt-8 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
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
                </li>
              </ul>

              <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-5">
                <div class="flex flex-1 justify-between sm:hidden">
                  <a
                    href="#"
                    class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </a>
                </div>
                <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p class="text-sm text-gray-700">
                      Showing
                      <span class="font-medium mx-1">1</span>
                      to
                      <span class="font-medium mx-1">10</span>
                      of
                      <span class="font-medium mx-1">97</span>
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      aria-label="Pagination"
                      class="isolate inline-flex -space-x-px rounded-md shadow-xs"
                    >
                      <a
                        href="#"
                        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span class="sr-only">Previous</span>
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          data-slot="icon"
                          aria-hidden="true"
                          class="size-5"
                        >
                          <path
                            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                          />
                        </svg>
                      </a>
                      <a
                        href="#"
                        aria-current="page"
                        class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        1
                      </a>
                      <a
                        href="#"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        2
                      </a>
                      <a
                        href="#"
                        class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                      >
                        3
                      </a>
                      <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 inset-ring inset-ring-gray-300 focus:outline-offset-0">
                        ...
                      </span>
                      <a
                        href="#"
                        class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                      >
                        8
                      </a>
                      <a
                        href="#"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        9
                      </a>
                      <a
                        href="#"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        10
                      </a>
                      <a
                        href="#"
                        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span class="sr-only">Next</span>
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          data-slot="icon"
                          aria-hidden="true"
                          class="size-5"
                        >
                          <path
                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                          />
                        </svg>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
