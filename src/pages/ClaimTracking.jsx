import { useState } from 'react';
import { Link } from 'react-router-dom';

const ClaimTracking = () => {
  const [claims] = useState([
    { id: 1, village: 'Village A', status: 'Approved', date: '2024-01-01' },
    { id: 2, village: 'Village B', status: 'Pending', date: '2024-01-02' },
    { id: 3, village: 'Village C', status: 'Rejected', date: '2024-01-03' },
  ]);

  const [filter, setFilter] = useState('');

  const filteredClaims = claims.filter(claim =>
    claim.village.toLowerCase().includes(filter.toLowerCase()) ||
    claim.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Claim Tracking</h1>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by village or status"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="bg-white shadow rounded">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Village</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClaims.map(claim => (
              <tr key={claim.id} className="border-t">
                <td className="p-4">{claim.id}</td>
                <td className="p-4">{claim.village}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded ${
                    claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    claim.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {claim.status}
                  </span>
                </td>
                <td className="p-4">{claim.date}</td>
                <td className="p-4">
                  <Link to={`/map?claim=${claim.id}`} className="text-blue-500 hover:underline">
                    View on Map
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimTracking;
