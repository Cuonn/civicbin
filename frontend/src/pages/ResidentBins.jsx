import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const ResidentBins = () => {
    const { user } = useAuth();
    const [bins, setBins] = useState([]);
    const [typeFilter, setTypeFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [reportingBinId, setReportingBinId] = useState(null);
    const [overflowing, setOverflowing] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const authHeader = { headers: { Authorization: `Bearer ${user.token}` } };

    const fetchBins = async () => {
        try {
            const response = await axiosInstance.get('/api/bins', authHeader);
            setBins(response.data);
        } catch (error) {
            console.error('Fetch bins error:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Failed to fetch bins.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBins();
    }, [user]);

    const openReportForm = (binId) => {
        setReportingBinId(binId);
        setOverflowing(false);
        setSuccessMessage('');
    };

    const cancelReport = () => {
        setReportingBinId(null);
        setOverflowing(false);
    };

    const submitReport = async (binId) => {
        setSubmitting(true);
        try {
            await axiosInstance.post('/api/reports', { bin: binId, overflowing }, authHeader);
            setSuccessMessage('Report submitted successfully. Thank you!');
            setReportingBinId(null);
            setOverflowing(false);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to submit report. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    const filteredBins = typeFilter === 'All' ? bins : bins.filter((bin) => bin.type === typeFilter);

    if (loading) return <div className="p-6 text-center">Loading bins...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Bin List</h1>

            {successMessage && (
                <div className="bg-green-100 text-green-800 border border-green-300 rounded p-3 mb-4">
                    {successMessage}
                </div>
            )}

            <div className="mb-4">
                <label className="mr-2 font-medium">Filter by type:</label>
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="p-2 border rounded"
                >
                <option value="All">All</option>
                <option value="General">General</option>
                <option value="Recycling">Recycling</option>
                </select>
            </div>

            {filteredBins.length === 0 ? (
                <div className="bg-white shadow-md rounded p-6 text-center text-gray-500">
                    No bins found for this filter.
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredBins.map((bin) => (
                        <div key={bin._id} className="bg-white shadow-md rounded p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold">{bin.binId} — {bin.location}</p>
                                    <p className="text-sm text-gray-600">Type: {bin.type}</p>
                                    <p className="text-sm text-gray-600">
                                        Next collection:{' '}
                                        {bin.nextCollectionDate ? new Date(bin.nextCollectionDate).toLocaleDateString() : 'Not scheduled'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`px-3 py-1 rounded text-white text-sm font-medium ${
                                        bin.fillStatus === 'Full' ? 'bg-red-500' : 'bg-green-500'
                                        }`}
                                    >
                                        {bin.fillStatus}
                                    </span>
                                    <button
                                        onClick={() => openReportForm(bin._id)}
                                        className="bg-civicbin-teal text-white px-3 py-1 rounded"
                                    >
                                        Report
                                    </button>
                                </div>
                            </div>

                            {reportingBinId === bin._id && (
                                <div className="mt-3 pt-3 border-t">
                                    <label className="flex items-center gap-2 mb-3">
                                        <input
                                            type="checkbox"
                                            checked={overflowing}
                                            onChange={(e) => setOverflowing(e.target.checked)}
                                        />
                                        <span className="text-sm">This bin is overflowing (optional)</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => submitReport(bin._id)}
                                            disabled={submitting}
                                            className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
                                        >
                                            {submitting ? 'Submitting...' : 'Submit Report'}
                                        </button>
                                        <button onClick={cancelReport} className="bg-gray-400 text-white px-4 py-2 rounded">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResidentBins;