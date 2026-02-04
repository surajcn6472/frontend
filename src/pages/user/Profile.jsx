import { Form, Link, redirect, useActionData } from "react-router";
import FormCheckbox from "../../components/ui/FormCheckbox";
import FormInput from "../../components/ui/FormInput";
import FormRadio from "../../components/ui/FormRadio";
import { DEPARTMENTS, SKILLS, USER_PROFILE } from "../../constants/endpoints";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/apiRequest";
import { useLoaderData } from "react-router";
export default function ProfileEdit() {
  const loaderData = useLoaderData();
  return (
    <div className="mx-auto max-w-5xl">
      <Form method="post" encType="multipart/form-data">
        <div className="space-y-12 divide-y divide-gray-900/10">
          <div>
            <div className="flex justify-between">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Profile
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                  Appears publicly on your profile.
                </p>
              </div>
              <div>
                <Link
                  class="text-sm/6 font-semibold text-blue-500"
                  to="/user/profile/edit"
                  data-discover="true"
                >
                  Edit
                </Link>
              </div>
            </div>

            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Name
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  {loaderData.name}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  for="email"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Email address
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  {loaderData.email}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  for="about"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Bio
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    {loaderData.profile.bio}
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  for="country"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Department
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="grid grid-cols-1 sm:max-w-xs">
                    {loaderData.profile.department?.name}
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
                <label
                  for="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={
                        import.meta.env.VITE_API_BASE_URL +
                        loaderData.profile.image
                      }
                      alt=""
                      className="h-20 w-auto rounded object-cover"
                    />
                  </div>
                </div>
              </div>

              <fieldset>
                <legend className="sr-only">Skills</legend>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
                  <div
                    aria-hidden="true"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Skills
                  </div>
                  <div className="mt-4 sm:col-span-2 sm:mt-0">
                    <div className="max-w-lg flex gap-3 flex-wrap">
                      {loaderData.profile.skills.map((skill) => (
                        <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="sr-only">Gender</legend>
                <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                  <div
                    aria-hidden="true"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Gender
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="max-w-lg">
                      <div className="mt-6 space-x-6 flex">
                        {loaderData.profile.gender?.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const result = await apiRequest({
    url: USER_PROFILE,
    method: "PUT",
    data: formData,
  });

  if (result.statusCode == 200) {
    return redirect("/user/profile");
  }

  return {
    error: result.payload?.message || "Invalid credentials",
    errors: result.payload?.errors,
  };
}

export async function loader() {
  const result = await apiRequest({
    url: USER_PROFILE,
    method: "GET",
  });

  if (result.statusCode == 200) {
    return result.data;
  }
}
