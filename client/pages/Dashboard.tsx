import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Package, Plus, Search, User, LogOut, Settings, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Mock data interfaces
interface Donation {
  id: string;
  name: string;
  category: string;
  quantity: number;
  expiryDate: string;
  status: 'active' | 'requested' | 'donated';
  requests: number;
}

interface Request {
  id: string;
  donationId: string;
  donationName: string;
  donorName: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}

interface DashboardStats {
  totalDonations: number;
  totalRequests: number;
  approved: number;
  pending: number;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalDonations: 0,
    totalRequests: 0,
    approved: 0,
    pending: 0
  });

  // Mock data
  const [donations] = useState<Donation[]>([
    {
      id: '1',
      name: 'Paracetamol 500mg',
      category: 'Medicine',
      quantity: 24,
      expiryDate: '2024-12-31',
      status: 'active',
      requests: 2
    },
    {
      id: '2',
      name: 'Blood Pressure Monitor',
      category: 'Equipment',
      quantity: 1,
      expiryDate: '2025-06-15',
      status: 'requested',
      requests: 1
    }
  ]);

  const [requests] = useState<Request[]>([
    {
      id: '1',
      donationId: '1',
      donationName: 'Insulin Pens',
      donorName: 'Dr. Smith',
      status: 'pending',
      requestDate: '2024-01-15'
    },
    {
      id: '2',
      donationId: '2',
      donationName: 'Thermometer',
      donorName: 'Health Clinic',
      status: 'approved',
      requestDate: '2024-01-14'
    }
  ]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Calculate stats based on user role
    if (user.role === 'donor') {
      setStats({
        totalDonations: donations.length,
        totalRequests: donations.reduce((sum, d) => sum + d.requests, 0),
        approved: donations.filter(d => d.status === 'donated').length,
        pending: donations.filter(d => d.status === 'requested').length
      });
    } else {
      setStats({
        totalDonations: 0,
        totalRequests: requests.length,
        approved: requests.filter(r => r.status === 'approved').length,
        pending: requests.filter(r => r.status === 'pending').length
      });
    }
  }, [user, donations, requests, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'requested': return 'bg-yellow-100 text-yellow-800';
      case 'donated': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary fill-primary mr-2" />
              <span className="text-2xl font-bold text-primary">MedMate</span>
              <Badge className={`ml-4 ${user.role === 'donor' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {user.role === 'donor' ? 'Donor' : 'NGO'}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profile">
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {user.role === 'donor' 
              ? 'Manage your donations and help those in need' 
              : 'Browse available donations and make requests'
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {user.role === 'donor' ? 'Total Donations' : 'Total Requests'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user.role === 'donor' ? stats.totalDonations : stats.totalRequests}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {user.role === 'donor' ? 'Approved Donations' : 'Approved Requests'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">...</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {user.role === 'donor' ? 'Pending Requests' : 'Pending Requests'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Profile Status</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user.verified ? '✓' : '!'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role-specific Content */}
        {user.role === 'donor' ? (
          // Donor Dashboard
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your donations efficiently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/add-donation">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Donation
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/my-donations">
                      <Package className="h-4 w-4 mr-2" />
                      View All Donations
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/requests">
                      <Bell className="h-4 w-4 mr-2" />
                      Manage Requests
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Donations */}
            <Card>
              <CardHeader>
                <CardTitle>Your Recent Donations</CardTitle>
                <CardDescription>Track your active donations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donations.slice(0, 3).map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{donation.name}</h4>
                        <p className="text-sm text-gray-600">
                          {donation.category} • Qty: {donation.quantity} • Expires: {donation.expiryDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(donation.status)}>
                          {donation.status}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">
                          {donation.requests} request(s)
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {donations.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No donations yet. Start by adding your first donation!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // NGO Dashboard
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Find and request donations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/browse-donations">
                      <Search className="h-4 w-4 mr-2" />
                      Browse Donations
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/my-requests">
                      <Package className="h-4 w-4 mr-2" />
                      My Requests
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Update Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Your Recent Requests</CardTitle>
                <CardDescription>Track your donation requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{request.donationName}</h4>
                        <p className="text-sm text-gray-600">
                          From: {request.donorName} • Requested: {request.requestDate}
                        </p>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  ))}
                  
                  {requests.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No requests yet. Start by browsing available donations!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
