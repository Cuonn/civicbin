import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const statusColor = {
    Pending: 'bg-yellow-500',
    Confirmed: 'bg-green-500',
    Rejected: 'bg-red-500',
};

const MyReports = () => {
    const { user } = useAuth();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
        try {
            const response = await axiosInstance.get('/api/reports/mine', {
            headers: { Authorization: `Bearer ${user.token}` },
            });
            setReports(response.data);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to fetch your reports.');
        } finally {
            setLoading(false);
        }
        };
        fetchReports();
    }, [user]);

    const handleDelete = async (reportId) => {
        if (!window.confirm('Are you sure you want to delete this report?')) return;
        try {
            await axiosInstance.delete(`/api/reports/${reportId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
            });
            setReports(reports.filter((r) => r._id !== reportId));
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete report.');
        }
    };

    if (loading) return <div className="p-6 text-center">Loading your reports...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">My Reports</h1>

            {reports.length === 0 ? (
                <div className="bg-white shadow-md rounded p-6 text-center text-gray-500">
                    You haven't submitted any reports yet. Report a bin from the Bin List page.
                </div>
            ) : (
                <div className="grid gap-4">
                    {reports.map((report) => (
                        <div key={report._id} className="bg-white shadow-md rounded p-4 flex justify-between items-center">
                            <div>
                                <p className="font-bold">
                                    {report.bin?.binId} - {report.bin?.location}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Submitted: {new Date(report.createdAt).toLocaleString()}
                                </p>
                                {report.overflowing && <p className="text-sm text-red-600 font-medium">Marked as overflowing</p>}
                                {report.notes && <p className='text-sm text-gray-700 mt-1'>Notes: {report.notes}</p>}
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded text-white text-sm font-medium ${statusColor[report.status]}`}>
                                    {report.status}
                                </span>
                                <button
                                    onClick={() => handleDelete(report._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyReports;