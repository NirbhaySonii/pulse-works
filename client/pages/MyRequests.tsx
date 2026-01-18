import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ArrowLeft, Search, User, Calendar, Package, Clock, CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface MyRequest {
  id: string;
  donationId: string;
  donationName: string;
  donationCategory: string;
  donationQuantity: number;
  donorName: string;
  donorEmail: string;
  message: string;
  requestDate: string;
  responseDate?: string;
  status: 'pending' | 'approved' | 'rejected';
  donorResponse?: string;
}

export default function MyRequests() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Mock requests data for NGO
  const [requests] = useState<MyRequest[]>([
    {
      id: '1',
      donationId: '1',
      donationName: 'Insulin Pens',
      donationCategory: 'Medicine',
      donationQuantity: 10,
      donorName: 'Dr. Smith',
      donorEmail: 'dr.smith@clinic.com',
      message: 'Hi! We urgently need insulin pens for our diabetes care program. We serve 50+ diabetic patients monthly.',
      requestDate: '2024-01-16',
      status: 'pending'
    },
    {
      id: '2',
      donationId: '2',
      donationName: 'Digital Thermometer',
      donationCategory: 'Equipment',
      donationQuantity: 5,
      donorName: 'Health Clinic',
      donorEmail: 'supplies@healthclinic.com',
      message: 'Our mobile health unit needs thermometers for patient screening in remote areas.',
      requestDate: '2024-01-15',
      responseDate: '2024-01-16',
      status: 'approved',
      donorResponse: 'Happy to help your mobile health initiative! Please arrange pickup at our clinic.'
    },
    {
      id: '3',
      donationId: '3',
      donationName: 'Blood Pressure Cuffs',
      donationCategory: 'Equipment',
      donationQuantity: 3,
      donorName: 'Medical Supply Co.',
      donorEmail: 'donations@medsupply.com',
      message: 'We need BP cuffs for our community health screening program.',
      requestDate: '2024-01-14',
      responseDate: '2024-01-15',
      status: 'rejected',
      donorResponse: 'Sorry, these items are already promised to another organization.'
    },
    {
      id: '4',
      donationId: '4',
      donationName: 'Antibiotics',
      donationCategory: 'Medicine',
      donationQuantity: 50,
      donorName: 'City Hospital',
      donorEmail: 'pharmacy@cityhospital.com',
      message: 'We need antibiotics for treating infections in our rural clinic patients.',
      requestDate: '2024-01-13',
      responseDate: '2024-01-14',
      status: 'approved',
      donorResponse: 'These are available for pickup. Please bring proper storage containers.'
    }
  ]);

  // Redirect if not an NGO
  if (!user || user.role !== 'ngo') {
    navigate('/dashboard');
    return null;
  }

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.donationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" asChild className="mr-4">
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <Heart className="h-8 w-8 text-primary fill-primary mr-2" />
            <span className="text-2xl font-bold text-primary">MedMate</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Requests</h1>
            <p className="text-gray-600 mt-2">Track your donation requests and their status</p>
          </div>
          <Button asChild className="mt-4 sm:mt-0">
            <Link to="/browse-donations">
              <MessageSquare className="h-4 w-4 mr-2" />
              Make New Request
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">{approvedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <XCircle className="h-8 w-8 text-red-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">{rejectedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-sm text-gray-600 flex items-center">
                {filteredRequests.length} of {requests.length} requests
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getStatusColor(request.status)}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1 capitalize">{request.status}</span>
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {request.donationName}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Package className="h-4 w-4" />
                        <span>{request.donationCategory} • Qty: {request.donationQuantity}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>From: {request.donorName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Your Message */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Your Request Message:</h4>
                      <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                        {request.message}
                      </p>
                    </div>

                    {/* Donor Response */}
                    {request.donorResponse && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Donor Response:</h4>
                        <p className={`text-sm p-3 rounded border-l-4 ${
                          request.status === 'approved' 
                            ? 'bg-green-50 border-green-500 text-green-700' 
                            : 'bg-red-50 border-red-500 text-red-700'
                        }`}>
                          {request.donorResponse}
                        </p>
                        {request.responseDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Responded on: {new Date(request.responseDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Next Steps for Approved Requests */}
                    {request.status === 'approved' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 mb-2">Next Steps:</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Contact the donor to arrange pickup</li>
                          <li>• Bring proper identification and storage containers</li>
                          <li>• Confirm pickup details and timing</li>
                        </ul>
                        <div className="mt-3 space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Contact Donor
                          </Button>
                          <Button size="sm" variant="outline">
                            Mark as Collected
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {requests.length === 0 ? 'No requests yet' : 'No requests match your filters'}
              </h3>
              <p className="text-gray-600 mb-6">
                {requests.length === 0 
                  ? 'Start by browsing available donations and making requests.'
                  : 'Try adjusting your search criteria or filters.'
                }
              </p>
              {requests.length === 0 ? (
                <Button asChild>
                  <Link to="/browse-donations">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Browse Donations
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
