import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import BinTable from '../components/BinTable';
import BinForm from '../components/BinForm';

const CoordinatorBins = () => {
    const { user } = useAuth();
    const [bins, setBins] = useState([]);
    const [editingBin, setEditingBin] = useState(null);

    const authHeader = { headers: { Authorization: `Bearer ${user.token}` } };

    const fetchBins = async () => {
        try {
            const response = await axiosInstance.get('/api/bins', authHeader);
            setBins(response.data);
        } catch (error) {
            alert('Failed to fetch bins.');
        }
    };

    useEffect(() => {
        fetchBins();
    }, []);

    const handleAddOrUpdate = async (binData) => {
        try {
            if (editingBin) {
                const response = await axiosInstance.put(`/api/bins/${editingBin._id}`, binData, authHeader);
                setBins(bins.map((b) => (b._id === response.data._id ? response.data : b)));
                setEditingBin(null);
            } else {
                const response = await axiosInstance.post('/api/bins', binData, authHeader);
                setBins([...bins, response.data]);
            }
        } catch (error) {
        alert(error.response?.data?.message || 'Failed to save bin.');
        }
    };

    const handleDelete = async (binId) => {
        if (!window.confirm('Are you sure you want to delete this bin?')) return;
        try {
            await axiosInstance.delete(`/api/bins/${binId}`, authHeader);
            setBins(bins.filter((b) => b._id !== binId));
        } catch (error) {
            alert('Failed to delete bin.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Bins</h1>
            <BinForm editingBin={editingBin} onSubmit={handleAddOrUpdate} onCancel={() => setEditingBin(null)} />
            <BinTable bins={bins} onEdit={setEditingBin} onDelete={handleDelete} />
        </div>
    );
};

export default CoordinatorBins;