import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const statusColor = {
    Pending: 'bg-yellow-500',
    Confirmed: 'bg-green-500',
    Rejected: 'bg-red-500',
};

const ReportsQueue = () => {
    const { user } = useAuth();
    const [reports, setReports] = useState([]);
    const [overflowOnly, setOverflowOnly] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [loading, setLoading] = useState(true);

    const authHeader = { headers: { Authorization: `Bearer ${user.token}` } };

    const fetchReports = async () => {
        setLoading(true);
        try {
            const query = overflowOnly ? '?overflowing=true' : '';
            const response = await axiosInstance.get(`/api/reports${query}`, authHeader);
            setReports(response.data);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to fetch reports.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (reportId, status) => {
        try {
            const response = await axiosInstance.patch(
                `/api/reports/${reportId}/status`,
                { status },
                authHeader
            );
            setReports(reports.map((r) => (r._id === reportId ? response.data : r)));
            setSelectedReport(response.data);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to update report status.');
        }
    };

    useEffect(() => {
        fetchReports();
    }, [overflowOnly]);

    if (loading) return <div className="p-6 text-center">Loading reports...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Reports Queue</h1>

            <label className="flex items-center gap-2 mb-4">
                <input
                type="checkbox"
                checked={overflowOnly}
                onChange={(e) => setOverflowOnly(e.target.checked)}
                />
                <span className="text-sm">Show overflowing reports only</span>
            </label>

            {reports.length === 0 ? (
                <div className="bg-white shadow-md rounded p-6 text-center text-gray-500">
                No reports found.
                </div>
            ) : (
                <table className="w-full bg-white shadow-md rounded overflow-hidden">
                    <thead>
                        <tr className="bg-civicbin-teal text-white text-left">
                            <th className="p-3">Bin</th>
                            <th className="p-3">Resident</th>
                            <th className="p-3">Overflowing</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr
                                key={report._id}
                                onClick={() => setSelectedReport(report)}
                                className="border-b cursor-pointer hover:bg-gray-50"
                            >
                                <td className="p-3">{report.bin?.binId}</td>
                                <td className="p-3">{report.resident?.name}</td>
                                <td className="p-3">{report.overflowing ? 'Yes' : 'No'}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-white text-xs font-medium ${statusColor[report.status]}`}>
                                        {report.status}
                                    </span>
                                </td>
                                <td className="p-3">{new Date(report.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                    <div className="bg-white rounded shadow-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-3">Report Detail</h2>
                        <p className="mb-1"><span className="font-medium">Bin ID:</span> {selectedReport.bin?.binId}</p>
                        <p className="mb-1"><span className="font-medium">Location:</span> {selectedReport.bin?.location}</p>
                        <p className="mb-1"><span className="font-medium">Type:</span> {selectedReport.bin?.type}</p>
                        <p className="mb-1"><span className="font-medium">Resident:</span> {selectedReport.resident?.name} ({selectedReport.resident?.email})</p>
                        <p className="mb-1"><span className="font-medium">Overflowing:</span> {selectedReport.overflowing ? 'Yes' : 'No'}</p>
                        <p className="mb-1"><span className="font-medium">Notes:</span> {selectedReport.notes || 'None'}</p>
                        <p className="mb-1"><span className="font-medium">Status:</span> {selectedReport.status}</p>
                        <p className="mb-3"><span className="font-medium">Submitted:</span> {new Date(selectedReport.createdAt).toLocaleString()}</p>

                        {selectedReport.status === 'Pending' && (
                            <div className="flex gap-2 mb-3">
                                <button
                                    onClick={() => handleStatusUpdate(selectedReport._id, 'Confirmed')}
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(selectedReport._id, 'Rejected')}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Reject
                                </button>
                            </div>
                        )}

                        <button
                            onClick={() => setSelectedReport(null)}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsQueue;