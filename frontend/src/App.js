import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';
import CoordinatorBins from './pages/CoordinatorBins';
import ResidentBins from './pages/ResidentBins';
import MyReports from './pages/MyReports';
import ReportsQueue from './pages/ReportsQueue';

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
                    <ResidentBins />
                </ProtectedRoute>
            }
        />
        <Route
            path="/my-reports"
            element={
                <ProtectedRoute>
                    <MyReports />
                </ProtectedRoute>
            }
        />
        <Route
            path="/coordinator/bins"
            element={
                <ProtectedRoute>
                    <CoordinatorBins />
                </ProtectedRoute>
            }
        />
        <Route
            path="/coordinator/reports"
            element={
                <ProtectedRoute>
                    <ReportsQueue />
                </ProtectedRoute>
            }
        />

      </Routes>
    </Router>
  );
}

export default App;
