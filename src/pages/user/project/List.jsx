import { Link } from "react-router-dom";
import ProjectFilter from "../../../components/ProjectFilter";
import Pagination from "../../../components/Pagination";
import ProjectCard from "../../../components/ProjectCard";

export default function List() {
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
        
        <ProjectFilter />

        <div class="mt-8 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                  <ProjectCard />
                </li>
              </ul>

              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
