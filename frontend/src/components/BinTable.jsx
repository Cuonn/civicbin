const BinTable = ({ bins, onEdit, onDelete}) => {
    if (bins.length == 0)
    {
        return (
            <div className="bg-white shadow-md rounded p-6 text-center text-gray-500">
                No bins added yet. Use the form above to add your first bin.
            </div>
        )
    }
    return (
        <table className="w-full bg-white shadow-md rounded overflow-hidden">
            <thead>
                <tr className="bg-civicbin-teal text-white text-left">
                    <th className="p-3">Bin ID</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Fill Status</th>
                    <th className="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {bins.map((bin) => (
                    <tr>
                        <td className="p-3">{bin.binId}</td>
                        <td className="p-3">{bin.location}</td>
                        <td className="p-3">{bin.type}</td>
                        <td className="p-3">{bin.fillStatus}</td>
                        <td className="p-3">
                            <button onClick={() => onEdit(bin)} className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded">
                                Edit
                            </button>
                            <button onClick={() => onDelete(bin._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                Delete
                            </button>
                        </td>
                    </tr>
                    ))} 
            </tbody>
        </table>
    );
};

export default BinTable;