import { useEffect, useState } from "react";

export default function FormInput({
  id,
  label,
  type = "text",
  name,
  placeholder,
  error,
  layout = "stacked",
}) {
  const [showError, setShowError] = useState(!!error);

  useEffect(() => {
    setShowError(!!error);
  }, [error]);

  return layout == "stacked" ? (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>

      <div className="mt-2">
        <input
          id={id}
          type={type}
          name={name}
          placeholder={showError ? error : placeholder}
          onChange={() => setShowError(false)}
          className={`px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
            ${
              showError
                ? "ring-red-500 focus:ring-red-500 placeholder-red-400"
                : "ring-gray-300 focus:ring-indigo-600"
            }
            sm:text-sm sm:leading-6`}
        />
      </div>
    </div>
  ) : (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
      >
        Name
      </label>
      <div className="mt-2 sm:col-span-2 sm:mt-0">
        <input
          id={id}
          type={type}
          name={name}
          placeholder={showError ? error : placeholder}
          onChange={() => setShowError(false)}
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:max-w-xs sm:text-sm ${
            showError
              ? "ring-red-500 focus:ring-red-500 placeholder-red-400"
              : "ring-gray-300 focus:ring-indigo-600"
          }`}
        />
      </div>
    </>
  );
}
