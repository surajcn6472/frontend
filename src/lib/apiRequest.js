const apiUrl =
  import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_API_VERSION;

export async function apiRequest({ url, method = "GET", data, headers = {} }) {
  try {
    const token = localStorage.getItem("token");
    const isFormData = data instanceof FormData;

    const response = await fetch(apiUrl + url, {
      method,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
    });

    let result = null;
    try {
      result = await response.json();
    } catch {}
    const customResponse = {
      statusCode: response.status,
    };

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      customResponse.msg = result?.msg || "Request failed";

      if (response.status === 422) {
        customResponse.errors = result?.errors || {};
      }

      return customResponse;
    } else {
      customResponse.data = result.data;
      if(result.meta) {
        customResponse.meta = result.meta;
      }
    }
    return customResponse;
  } catch (error) {
    return {
      statusCode: 0,
      msg: "Network error. Please try again.",
    };
  }
}
