import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';

const ResidentHome = () => <div className="p-6">Nearby Bins (Residents) - Coming soon</div>;
const CoordinatorHome = () => <div className="p-6">Manage Bins (Coordinator) - Coming soon</div>;

const ProtectedRoute = ({children}) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" /> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
            path="/bins"
            element={
                <ProtectedRoute>
                    <ResidentHome />
                </ProtectedRoute>
            }
        />
        <Route
            path="/coordinator/bins"
            element={
                <ProtectedRoute>
                    <CoordinatorHome />
                </ProtectedRoute>
            }
        />

      </Routes>
    </Router>
  );
}

export default App;
