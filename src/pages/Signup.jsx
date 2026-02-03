import { Form, useActionData } from "react-router-dom";
import { redirect } from "react-router-dom";
import { apiRequest } from "../lib/apiRequest.js";
import { AUTH_REGISTER } from "../constants/endpoints";
import FormInput from "../components/ui/FormInput.jsx";

export default function Signup() {
  const actionData = useActionData();
  return (
    <div className="flex min-h-full flex-col justify-center py-10 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-120">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <Form method="POST" className="space-y-6">
            
            <FormInput
              id="name"
              label="Name address"
              type="text"
              name="name"
              placeholder="Enter name"
              error={actionData?.errors?.name}
            />

            <FormInput
              id="email"
              label="Email address"
              type="email"
              name="email"
              placeholder="Enter email"
              error={actionData?.errors?.email}
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              name="password"
              placeholder="Enter password"
              error={actionData?.errors?.password}
            />

            <FormInput
              id="confirm_password"
              label="Confirm Password"
              type="password"
              name="confirm_password"
              placeholder="Enter confirm password"
              error={actionData?.errors?.confirm_password}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
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

  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const response = await apiRequest({
    url: AUTH_REGISTER,
    method: "POST",
    data: payload,
  });

  if (response.statusCode == 201) {
    return redirect("/login");
  }

  return response;
}
