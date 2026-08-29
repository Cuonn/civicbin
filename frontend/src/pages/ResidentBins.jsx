import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const ResidentBins = () => {
    const { user } = useAuth();
    const [bins, setBins] = useState([]);
    const [typeFilter, setTypeFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBins = async () => {
        try {
            const response = await axiosInstance.get('/api/bins', {
            headers: { Authorization: `Bearer ${user.token}` },
            });
            setBins(response.data);
        } catch (error) {
            console.error('Fetch bins error:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Failed to fetch bins.');
        } finally {
            setLoading(false);
        }
        };
        fetchBins();
    }, [user]);

    const filteredBins = typeFilter === 'All' ? bins : bins.filter((bin) => bin.type === typeFilter);

    if (loading) return <div className="p-6 text-center">Loading bins...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Bin List</h1>

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
                        <div key={bin._id} className="bg-white shadow-md rounded p-4 flex justify-between items-center">
                            <div>
                                <p className="font-bold">{bin.binId} — {bin.location}</p>
                                <p className="text-sm text-gray-600">Type: {bin.type}</p>
                                <p className="text-sm text-gray-600">
                                    Next collection:{' '}
                                    {bin.nextCollectionDate ? new Date(bin.nextCollectionDate).toLocaleDateString() : 'Not scheduled'}
                                </p>
                            </div>
                            <span
                                className={`px-3 py-1 rounded text-white text-sm font-medium ${
                                bin.fillStatus === 'Full' ? 'bg-red-500' : 'bg-green-500'
                                }`}
                            >
                                {bin.fillStatus}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResidentBins;