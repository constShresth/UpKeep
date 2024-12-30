import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const {logout, isAuthenticated} = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-teal-500 text-white p-4">
      <ul className="flex justify-evenly items-center">
        {/* <li>
          <Link to="/login" className="hover:text-gray-200">Login</Link>
        </li>
        <li>
          <Link to="/admin/home" className="hover:text-gray-200">Admin</Link>
        </li>
        <li>
          <Link to="/resident/home" className="hover:text-gray-200">Resident</Link>
        </li>
        <li>
          <Link to="/staff/home" className="hover:text-gray-200">Staff</Link>
        </li> */}
        
        {isAuthenticated && <li>
          <button
            onClick={handleLogout}
            className="hover:text-gray-200 bg-red-500 text-white p-2 rounded"
          >
            Logout
          </button>
        </li>}
      </ul>
    </nav>
  );
}
