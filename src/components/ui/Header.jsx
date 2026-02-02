import { Link } from "react-router";

export const Header = ({children, ...props}) => {
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
        <div className="lg:flex lg:gap-x-12">
          <Link to="user/projects" className="text-sm/6 font-semibold text-gray-900">
            My Projects
          </Link>
          <Link to="user/profile" className="text-sm/6 font-semibold text-gray-900">
            Profile
          </Link>
        </div>
        <div className="flex gap-x-4">
          <Link to="signup" className="text-sm/6 font-semibold text-gray-900">
            Sign up
          </Link>
          <Link to="login" className="text-sm/6 font-semibold text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
