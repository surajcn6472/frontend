import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { logout } from "../../store/slices/authSlice";

export const Header = ({ children, isAuthenticated, ...props }) => {
  const dispatch = useDispatch();
  return (
    <header {...props}>
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="lg:flex lg:gap-x-12">
          <Link to="projects" className="text-sm/6 font-semibold text-gray-900">
            Projects
          </Link>
        </div>
        {isAuthenticated ? (
          <div className="lg:flex lg:gap-x-12">
            <Link
              to="user/projects"
              className="text-sm/6 font-semibold text-gray-900"
            >
              My Projects
            </Link>
            <Link
              to="user/profile"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Profile
            </Link>
            <button
              className="text-sm/6 font-semibold text-gray-900"
              role="button"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-4">
            <Link to="signup" className="text-sm/6 font-semibold text-gray-900">
              Sign up
            </Link>
            <Link to="login" className="text-sm/6 font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
