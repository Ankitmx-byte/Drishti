import { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    village: 'Village A',
    role: 'Gram Sabha'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
      </div>

      <div className="bg-white p-6 rounded shadow max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          ) : (
            <p className="text-lg">{user.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          ) : (
            <p className="text-lg">{user.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          ) : (
            <p className="text-lg">{user.phone}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Village</label>
          {isEditing ? (
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          ) : (
            <p className="text-lg">{user.village}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <p className="text-lg">{user.role}</p>
        </div>

        <div className="flex space-x-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-green-500 text-white px-4 py-2 rounded">
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
