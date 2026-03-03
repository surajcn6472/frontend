import { Footer } from "../ui/Footer";
import { Header } from "../ui/Header";
import { Outlet, Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

const GUEST_ROUTES = ["/login", "/signup", "/forgot-password"];
const PUBLIC_ROUTES = ["/projects"];

export default function RootLayout() {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const isGuestRoute = GUEST_ROUTES.includes(location.pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

  if (!token && !isGuestRoute && !isPublicRoute) {
    return <Navigate to="/login" replace />;
  }

  if (token && isGuestRoute) {
    return <Navigate to="/user/projects" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isAuthenticated={Boolean(token)}
        className="sticky inset-x-0 top-0 z-50 border-b-2 border-gray-100 bg-white"
      />

      <main className="flex-1 p-8">
        <Outlet />
      </main>

      <Footer className="text-center mt-auto border-t-2 border-gray-100" />
    </div>
  );
}
