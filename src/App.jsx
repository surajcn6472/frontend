import { Layout } from "./components/ui/Layout";

function App() {
  return (
    <Layout className="min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Main Content Area
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          This layout uses Tailwind's flexbox utilities to ensure the footer
          always stays at the bottom of the page.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          When there's minimal content, the footer sticks to the bottom of the
          viewport. When there's more content, it naturally flows below the
          content.
        </p>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded transition-colors mt-4"
        >
          Add More Content
        </button>
      </div>
    </Layout>
  );
}

export default App;
