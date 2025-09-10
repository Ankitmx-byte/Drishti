import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, MapPin } from 'lucide-react';

const Alerts = () => {
  const [alerts] = useState([
    { id: 1, type: 'Encroachment', severity: 'High', location: 'Village A', date: '2024-01-01' },
    { id: 2, type: 'Land Use Change', severity: 'Medium', location: 'Village B', date: '2024-01-02' },
    { id: 3, type: 'Illegal Activity', severity: 'Low', location: 'Village C', date: '2024-01-03' },
  ]);

  const [filter, setFilter] = useState('');

  const filteredAlerts = alerts.filter(alert =>
    alert.type.toLowerCase().includes(filter.toLowerCase()) ||
    alert.location.toLowerCase().includes(filter.toLowerCase()) ||
    alert.severity.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by type, location, or severity"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="space-y-4">
        {filteredAlerts.map(alert => (
          <div key={alert.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className={`mr-4 ${
                alert.severity === 'High' ? 'text-red-500' :
                alert.severity === 'Medium' ? 'text-yellow-500' :
                'text-green-500'
              }`} size={24} />
              <div>
                <h3 className="font-semibold">{alert.type}</h3>
                <p className="text-gray-600">{alert.location} - {alert.date}</p>
                <span className={`px-2 py-1 rounded text-sm ${
                  alert.severity === 'High' ? 'bg-red-100 text-red-800' :
                  alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {alert.severity}
                </span>
              </div>
            </div>
            <Link to={`/map?alert=${alert.id}`} className="flex items-center text-blue-500 hover:underline">
              <MapPin size={16} className="mr-1" />
              View on Map
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
