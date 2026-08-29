import { useState, useEffect } from 'react';

const BinForm = ({ editingBin, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({ binId: '', location: '', type: 'General', fillStatus: 'Not Full', nextCollectionDate: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingBin) {
            setFormData({
                binId: editingBin.binId,
                location: editingBin.location,
                type: editingBin.type,
                fillStatus: editingBin.fillStatus,
                nextCollectionDate: editingBin.nextCollectionDate ? editingBin.nextCollectionDate.split('T')[0] : '',
        });
        } else {
            setFormData({ binId: '', location: '', type: 'General', fillStatus: 'Not Full' });
        }
    }, [editingBin]);

    const validate = () => {
        const newErrors = {};
        if (!formData.binId.trim()) newErrors.binId = 'Bin ID is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
            <h2 className="text-xl font-bold mb-4">{editingBin ? 'Edit Bin' : 'Add Bin'}</h2>

            <input
                type="text" placeholder="Bin ID" value={formData.binId} disabled={!!editingBin}
                onChange={(e) => setFormData({ ...formData, binId: e.target.value })}
                className="w-full p-2 border rounded mb-1"
            />
            {errors.binId && <p className="text-red-500 text-sm mb-2">{errors.binId}</p>}

            <input
                type="text" placeholder="Location (e.g. 123 Main Street)" value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2 border rounded mb-1"
            />
            {errors.location && <p className="text-red-500 text-sm mb-2">{errors.location}</p>}

            <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-2 border rounded mb-2"
            >
                <option value="General">General</option>
                <option value="Recycling">Recycling</option>
            </select>

            <select
                value={formData.fillStatus}
                onChange={(e) => setFormData({ ...formData, fillStatus: e.target.value })}
                className="w-full p-2 border rounded mb-2"
            >
                <option value="Not Full">Not Full</option>
                <option value="Full">Full</option>
            </select>

            <label className="block text-sm text-gray-600 mb-1">
                Next Collection Date (optional)
            </label>
            <input
                type="date"
                value={formData.nextCollectionDate}
                onChange={(e) => setFormData({ ...formData, nextCollectionDate: e.target.value })}
                className="w-full p-2 border rounded mb-2"
            />

            <div className="flex gap-2 mt-2">
                <button type="submit" className="bg-civicbin-teal text-white px-4 py-2 rounded">
                {editingBin ? 'Update Bin' : 'Add Bin'}
                </button>
                {editingBin && (
                <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">
                    Cancel
                </button>
                )}
            </div>
        </form>
  );
};

export default BinForm;