import { Form, redirect, useActionData } from "react-router-dom";
import { apiRequest } from "../../../lib/apiRequest";
import { USER_PROJECTS } from "../../../constants/endpoints";

export default function Create() {
  const actionData = useActionData();
  console.log(actionData);
  return (
    <div className="flex min-h-full flex-col justify-center py-10 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          New Project
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-120">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <Form method="POST" className="space-y-5">
            <div className="flex items-center flex-col">
              <div className="flex justify-between items-center w-full">
                <label
                  htmlFor="name"
                  className="w-1/3 text-sm font-medium text-gray-700"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  placeholder="Enter project name"
                />
              </div>
              <p className="w-full text-red-500 text-right">{actionData?.errors?.name}</p>
            </div>

            <div className="flex items-center flex-col">
              <div className="flex justify-between items-center w-full">
                <label
                  htmlFor="startDate"
                  className="w-1/3 text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              <p className="w-full text-red-500 text-right">
                {actionData?.errors?.startDate}
              </p>
            </div>

            <div className="flex items-center flex-col">
              <div className="flex justify-between items-center w-full">
                <label
                  htmlFor="endDate"
                  className="w-1/3 text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              <p className="w-full text-red-500 text-right">
                {actionData?.errors?.endDate}
              </p>
            </div>

            <div className="flex items-center flex-col">
              <div className="flex justify-between items-center w-full">
                <label
                  htmlFor="rate"
                  className="w-1/3 text-sm font-medium text-gray-700"
                >
                  Rate
                </label>
                <div className="flex-1 relative">
                  <input
                    type="number"
                    id="rate"
                    name="rate"
                    className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="Enter rate"
                    step="0.01"
                  />
                </div>
              </div>
              <p className="w-full text-red-500 text-right">{actionData?.errors?.rate}</p>
            </div>

            <div className="flex items-center flex-col">
              <div className="flex justify-between items-center w-full">
                <label
                  htmlFor="status"
                  className="w-1/3 text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="finished">Finished</option>
                </select>
              </div>
              <p className="w-full text-red-500 text-right">
                {actionData?.errors?.status}
              </p>
            </div>

            <div className="flex items-center pt-4">
              <div className="w-1/3"></div>
              <button className="flex-1 bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition font-medium">
                Create Project
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const result = await apiRequest({
    url: USER_PROJECTS,
    method: "POST",
    data: {
      name: formData.get("name"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      rate: formData.get("rate"),
      status: formData.get("status"),
    },
  });

  if (result.statusCode == 201) {
    return redirect("/user/projects");
  }

  return result;
}
