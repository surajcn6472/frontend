export default function Edit() {
  return (
    <div>Edit</div>
  )
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const projectId = params.projectId;

  const result = await apiRequest({
    url: `/user/projects/${projectId}`,
    method: "PUT",
    data: {
      name: formData.get("name"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      rate: formData.get("rate"),
      status: formData.get("status"),
    },
  });

  if (result.statusCode == 200) {
    return redirect("/user/projects");
  }
}

export async function loader({ params }) {
  const projectId = params.projectId;

  const result = await apiRequest({
    url: `/user/projects/${projectId}`,
    method: "GET",
  });

  if (result.statusCode == 200) {
    return result.data;
  }

  throw new Response("Failed to load project", { status: result.statusCode });
}
