import { Form, Link, redirect, useActionData } from "react-router";
import FormCheckbox from "../../components/ui/FormCheckbox";
import FormInput from "../../components/ui/FormInput";
import FormRadio from "../../components/ui/FormRadio";
import { DEPARTMENTS, SKILLS, USER_PROFILE } from "../../constants/endpoints";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/apiRequest";
import { useLoaderData } from "react-router";

export default function ProfileEdit() {
  const actionData = useActionData();
  const loaderData = useLoaderData();

  const selectedSkillIds = loaderData.profile.skills.map((skill) => skill.id);
  const [departments, setDepartments] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // image preview logic
  const [imagePreview, setImagePreview] = useState(null);
  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
  }

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  // image preview logic ends here

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      apiRequest({ url: SKILLS, method: "GET" }),
      apiRequest({ url: DEPARTMENTS, method: "GET" }),
    ])
      .then(([skillRes, deptRes]) => {
        if (isMounted) {
          setDepartments(deptRes.data);
          setSkills(skillRes.data);
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <span className="text-2xl">Please wait. Loading...</span>;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Form method="post" encType="multipart/form-data">
        <div className="space-y-12 divide-y divide-gray-900/10">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Appears publicly on your profile.
            </p>

            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <FormInput
                  defaultValue={loaderData.name}
                  id="name"
                  label="Name"
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  error={actionData?.errors?.name}
                  layout="horizontal"
                />
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormInput
                    defaultValue={loaderData.email}
                    id="email"
                    label="Email address"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    error={actionData?.errors?.email}
                    layout="horizontal"
                  />
                </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  for="bio"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Bio
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="bio"
                    name="bio"
                    rows="3"
                    placeholder="Write about yourself"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:max-w-2xl sm:text-sm"
                  >
                    {loaderData.profile.bio}
                  </textarea>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
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
                    <select
                      defaultValue={loaderData.profile.department.id}
                      id="department_id"
                      name="department_id"
                      autoComplete="department_id"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    >
                      <option>Select Department</option>
                      {departments.map((department) => (
                        <option value={department.id} key={department.id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                    <svg
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-4 self-center justify-self-end text-gray-500 sm:size-4"
                    >
                      <path
                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
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
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        className="h-12 w-12 rounded object-cover"
                        alt="Preview"
                      />
                    ) : loaderData.profile.image ? (
                      <img
                        src={
                          import.meta.env.VITE_API_BASE_URL +
                          loaderData.profile.image
                        }
                        className="h-12 w-12 rounded object-cover"
                        alt=""
                      />
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-12 w-12 text-gray-300"
                      >
                        <path
                          d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    )}
                    <label
                      for="image"
                      class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image"
                        type="file"
                        name="image"
                        class="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
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
                    <div className="max-w-lg space-y-6 flex gap-3 flex-wrap">
                      {skills.map((skill) => (
                        <FormCheckbox
                          key={"skill_" + skill.id}
                          id={"skill_" + skill.id}
                          name="skills[]"
                          label={skill.name}
                          defaultValue={skill.id}
                          defaultChecked={selectedSkillIds.includes(skill.id)}
                        />
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
                        <FormRadio
                          id="male"
                          name="gender"
                          label="Male"
                          value="male"
                          defaultChecked={loaderData.profile.gender === "male"}
                        />

                        <FormRadio
                          id="female"
                          name="gender"
                          label="Female"
                          value="female"
                          defaultChecked={
                            loaderData.profile.gender === "female"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            to="/user/profile"
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
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
