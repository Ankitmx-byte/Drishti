import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, XCircle, AlertTriangle, TrendingUp, Users, MapPin, Calendar, ArrowUpRight, ArrowDownRight, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data - replace with real data from API
  const kpiData = [
    {
      title: 'Total Claims',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Approved Claims',
      value: '892',
      change: '+8.2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Review',
      value: '156',
      change: '-3.1%',
      trend: 'down',
      icon: Users,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Active Alerts',
      value: '23',
      change: '+15.3%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const monthlyData = [
    { month: 'Jan', claims: 120, approved: 95 },
    { month: 'Feb', claims: 135, approved: 110 },
    { month: 'Mar', claims: 148, approved: 125 },
    { month: 'Apr', claims: 162, approved: 138 },
    { month: 'May', claims: 175, approved: 150 },
    { month: 'Jun', claims: 190, approved: 165 }
  ];

  const stateData = [
    { name: 'Madhya Pradesh', value: 35, color: '#3B82F6' },
    { name: 'Odisha', value: 25, color: '#10B981' },
    { name: 'Telangana', value: 20, color: '#F59E0B' },
    { name: 'Tripura', value: 20, color: '#EF4444' }
  ];

  const recentActivity = [
    { id: 1, action: 'New claim submitted', user: 'Rajesh Kumar', time: '2 hours ago', type: 'claim' },
    { id: 2, action: 'Claim approved', user: 'Priya Singh', time: '4 hours ago', type: 'approval' },
    { id: 3, action: 'Alert generated', user: 'System', time: '6 hours ago', type: 'alert' },
    { id: 4, action: 'Report generated', user: 'Admin', time: '1 day ago', type: 'report' }
  ];

  // Mock claim locations for mini-map
  const claimLocations = [
    { id: 1, position: [23.2599, 81.8282], village: 'Village A', status: 'Approved', state: 'MP' },
    { id: 2, position: [23.9408, 91.9882], village: 'Village B', status: 'Pending', state: 'TR' },
    { id: 3, position: [20.9517, 85.0985], village: 'Village C', status: 'Approved', state: 'OD' },
    { id: 4, position: [17.3850, 78.4867], village: 'Village D', status: 'Pending', state: 'TL' },
    { id: 5, position: [22.9734, 78.6569], village: 'Village E', status: 'Approved', state: 'MP' },
    { id: 6, position: [24.6637, 93.9063], village: 'Village F', status: 'Pending', state: 'TR' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, User!</h1>
            <p className="text-green-100">Here's what's happening with FRA claims today.</p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Claim Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="claims" stroke="#3B82F6" strokeWidth={2} name="Total Claims" />
              <Line type="monotone" dataKey="approved" stroke="#10B981" strokeWidth={2} name="Approved Claims" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* State Distribution */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Claims by State</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stateData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Claims Overview Map */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Claims Overview</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              View Full Map
            </button>
          </div>
          <div className="h-64 w-full rounded-lg overflow-hidden">
            <MapContainer
              center={[22.5, 82.5]}
              zoom={4}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {claimLocations.map((claim) => (
                <Marker key={claim.id} position={claim.position}>
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold">{claim.village}</p>
                      <p className="text-gray-600">State: {claim.state}</p>
                      <p className={`text-xs ${claim.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                        Status: {claim.status}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {/* State boundaries circles */}
              <Circle center={[23.2599, 81.8282]} radius={50000} pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.1 }} />
              <Circle center={[23.9408, 91.9882]} radius={50000} pathOptions={{ color: '#EF4444', fillColor: '#EF4444', fillOpacity: 0.1 }} />
              <Circle center={[20.9517, 85.0985]} radius={50000} pathOptions={{ color: '#10B981', fillColor: '#10B981', fillOpacity: 0.1 }} />
              <Circle center={[17.3850, 78.4867]} radius={50000} pathOptions={{ color: '#F59E0B', fillColor: '#F59E0B', fillOpacity: 0.1 }} />
            </MapContainer>
          </div>
          <div className="mt-3 flex justify-center space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              <span>Madhya Pradesh</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span>Tripura</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span>Odisha</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
              <span>Telangana</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`p-2 rounded-full ${
                  activity.type === 'claim' ? 'bg-blue-100' :
                  activity.type === 'approval' ? 'bg-green-100' :
                  activity.type === 'alert' ? 'bg-red-100' : 'bg-purple-100'
                }`}>
                  {activity.type === 'claim' && <FileText className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'approval' && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {activity.type === 'alert' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                  {activity.type === 'report' && <TrendingUp className="h-4 w-4 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">by {activity.user}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/claim-submission')}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              <FileText className="h-4 w-4 mr-2" />
              Submit New Claim
            </button>
            <button
              onClick={() => navigate('/map')}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <MapPin className="h-4 w-4 mr-2" />
              View Map
            </button>
            <button
              onClick={() => navigate('/reports')}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate Report
            </button>
            <button
              onClick={() => navigate('/alerts')}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              View Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
