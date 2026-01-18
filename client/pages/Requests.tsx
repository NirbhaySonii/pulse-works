import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, MessageSquare, ArrowLeft, Search, User, Calendar, Package, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface DonationRequest {
  id: string;
  donationId: string;
  donationName: string;
  donationCategory: string;
  donationQuantity: number;
  requesterName: string;
  requesterType: 'ngo';
  requesterEmail: string;
  requesterPhone?: string;
  message: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  urgency: 'low' | 'medium' | 'high';
}

export default function Requests() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<DonationRequest | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock requests data
  const [requests, setRequests] = useState<DonationRequest[]>([
    {
      id: '1',
      donationId: '1',
      donationName: 'Paracetamol 500mg',
      donationCategory: 'Medicine',
      donationQuantity: 24,
      requesterName: 'Hope Medical Foundation',
      requesterType: 'ngo',
      requesterEmail: 'contact@hopefoundation.org',
      requesterPhone: '+1234567890',
      message: 'Hi! We are Hope Medical Foundation serving underprivileged communities. We urgently need paracetamol for our community health program. We serve 200+ families and this donation would help with fever management during the current health crisis.',
      requestDate: '2024-01-16',
      status: 'pending',
      urgency: 'high'
    },
    {
      id: '2',
      donationId: '2',
      donationName: 'Blood Pressure Monitor',
      donationCategory: 'Equipment',
      donationQuantity: 1,
      requesterName: 'Community Care Network',
      requesterType: 'ngo',
      requesterEmail: 'admin@communitycare.org',
      message: 'Hello, we run a mobile health clinic and desperately need blood pressure monitors. This device would help us screen patients in remote areas. We have proper medical staff to operate it safely.',
      requestDate: '2024-01-15',
      status: 'pending',
      urgency: 'medium'
    },
    {
      id: '3',
      donationId: '1',
      donationName: 'Paracetamol 500mg',
      donationCategory: 'Medicine',
      donationQuantity: 24,
      requesterName: 'Rural Health Initiative',
      requesterType: 'ngo',
      requesterEmail: 'info@ruralhealth.org',
      message: 'We provide healthcare to rural villages and need pain relief medications. This would help 50+ patients this month.',
      requestDate: '2024-01-14',
      status: 'approved',
      urgency: 'low'
    },
    {
      id: '4',
      donationId: '3',
      donationName: 'Vitamin D3 Supplements',
      donationCategory: 'Supplements',
      donationQuantity: 60,
      requesterName: 'Senior Care Foundation',
      requesterType: 'ngo',
      requesterEmail: 'care@seniorcare.org',
      message: 'We work with elderly patients who need vitamin supplements. This would be perfect for our nutrition program.',
      requestDate: '2024-01-13',
      status: 'rejected',
      urgency: 'low'
    }
  ]);

  // Redirect if not a donor
  if (!user || user.role !== 'donor') {
    navigate('/dashboard');
    return null;
  }

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.donationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRequestAction = async (requestId: string, action: 'approve' | 'reject') => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' }
        : req
    ));

    console.log(`Request ${requestId} ${action}ed with message:`, responseMessage);
    
    setIsProcessing(false);
    setSelectedRequest(null);
    setResponseMessage("");
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Donation Requests</h1>
          <p className="text-gray-600 mt-2">Manage requests from NGOs for your donations</p>
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
                      <Badge className={getUrgencyColor(request.urgency)}>
                        {request.urgency} priority
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Request for: {request.donationName}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Package className="h-4 w-4" />
                        <span>{request.donationCategory} • Qty: {request.donationQuantity}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{request.requesterName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(request.requestDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{request.message}</p>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedRequest(request)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Request Details</DialogTitle>
                          <DialogDescription>
                            Review and respond to this donation request
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedRequest && (
                          <div className="space-y-4">
                            {/* Request Info */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">Donation Request</h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p><span className="font-medium">Item:</span> {selectedRequest.donationName}</p>
                                  <p><span className="font-medium">Category:</span> {selectedRequest.donationCategory}</p>
                                  <p><span className="font-medium">Quantity:</span> {selectedRequest.donationQuantity}</p>
                                </div>
                                <div>
                                  <p><span className="font-medium">Urgency:</span> {selectedRequest.urgency}</p>
                                  <p><span className="font-medium">Date:</span> {new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
                                  <p><span className="font-medium">Status:</span> {selectedRequest.status}</p>
                                </div>
                              </div>
                            </div>

                            {/* Requester Info */}
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                              <h4 className="font-semibold mb-2">Requester Information</h4>
                              <div className="text-sm space-y-1">
                                <p><span className="font-medium">Organization:</span> {selectedRequest.requesterName}</p>
                                <p><span className="font-medium">Email:</span> {selectedRequest.requesterEmail}</p>
                                {selectedRequest.requesterPhone && (
                                  <p><span className="font-medium">Phone:</span> {selectedRequest.requesterPhone}</p>
                                )}
                              </div>
                            </div>

                            {/* Message */}
                            <div>
                              <h4 className="font-semibold mb-2">Request Message</h4>
                              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                <p className="text-gray-700">{selectedRequest.message}</p>
                              </div>
                            </div>

                            {/* Response (if not already decided) */}
                            {selectedRequest.status === 'pending' && (
                              <div className="space-y-3">
                                <div>
                                  <label className="text-sm font-medium">Response Message (Optional)</label>
                                  <Textarea
                                    placeholder="Add a message to the requester..."
                                    value={responseMessage}
                                    onChange={(e) => setResponseMessage(e.target.value)}
                                    rows={3}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {selectedRequest && selectedRequest.status === 'pending' && (
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setSelectedRequest(null);
                                setResponseMessage("");
                              }}
                            >
                              Close
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleRequestAction(selectedRequest.id, 'reject')}
                              disabled={isProcessing}
                            >
                              {isProcessing ? "Processing..." : "Reject"}
                            </Button>
                            <Button 
                              onClick={() => handleRequestAction(selectedRequest.id, 'approve')}
                              disabled={isProcessing}
                            >
                              {isProcessing ? "Processing..." : "Approve"}
                            </Button>
                          </DialogFooter>
                        )}
                      </DialogContent>
                    </Dialog>

                    {request.status === 'pending' && (
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleRequestAction(request.id, 'approve')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRequestAction(request.id, 'reject')}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
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
                  ? 'Requests will appear here when NGOs request your donations.'
                  : 'Try adjusting your search criteria or filters.'
                }
              </p>
              {requests.length > 0 && (
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
