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

    const result = await response.json();

    return {
      statusCode: response.status,
      data: result?.data,
      msg: result?.msg,
    };
  } catch {
    return {
      statusCode: 0,
      msg: "Network error",
    };
  }
}
