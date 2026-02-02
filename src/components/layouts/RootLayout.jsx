import { Outlet } from "react-router";
import { Footer } from "../ui/Footer";
import { Header } from "../ui/Header";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header className="sticky inset-x-0 top-0 z-50 border-b-2 border-gray-100" />

      <main className="flex-1 p-8">
        <Outlet />
      </main>

      <Footer className="text-center mt-auto border-t-2 border-gray-100" />
    </div>
  );
}