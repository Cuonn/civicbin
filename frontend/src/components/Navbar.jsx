import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">CivicBin</Link>
      <div>
        {user ? (
            <>
            {user.role == 'Coordinator' ? (
                <>
                    <Link to="/coordinator/bins" className="mr-4">Manage Bins</Link>
                    <Link to="/coordinator/reports" className="mr-4">Reports Queue</Link>
                </>
            ) : (
                <>
                    <Link to="/bins" className="mr-4">Nearby Bins</Link>
                    <Link to="/my_reports" className="mr-4">My Reports</Link>
                </>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
