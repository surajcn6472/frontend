import { Link } from "react-router-dom";

export default function ProjectFilter() {
  return (
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
  );
}
