import { Footer } from "../ui/Footer";
import { Header } from "../ui/Header";
import { Outlet, Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

const PUBLIC_ROUTES = ["/login", "/signup", "/forgot-password"];

export default function RootLayout() {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

  if (!token && !isPublicRoute) {
    return <Navigate to="/login" replace />;
  }

  if (token && isPublicRoute) {
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
