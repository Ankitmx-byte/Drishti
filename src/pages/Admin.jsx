import { useState } from 'react';

const Admin = () => {
  const [users] = useState([
    { id: 1, name: 'User 1', role: 'Gram Sabha', email: 'user1@example.com' },
    { id: 2, name: 'User 2', role: 'District Officer', email: 'user2@example.com' },
  ]);

  const [logs] = useState([
    { id: 1, action: 'Login', user: 'User 1', timestamp: '2024-01-01 10:00' },
    { id: 2, action: 'Claim Submitted', user: 'User 2', timestamp: '2024-01-01 11:00' },
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">
                    <button className="text-blue-500 mr-2">Edit</button>
                    <button className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">System Logs</h2>
          <div className="space-y-2">
            {logs.map(log => (
              <div key={log.id} className="border p-2 rounded">
                <p><strong>{log.action}</strong> by {log.user}</p>
                <p className="text-sm text-gray-600">{log.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
