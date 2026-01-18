import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Package, Plus, Search, Edit, Trash2, ArrowLeft, Eye, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Donation {
  id: string;
  name: string;
  category: string;
  quantity: number;
  expiryDate: string;
  description: string;
  status: 'active' | 'requested' | 'donated' | 'expired';
  requests: number;
  imageUrl?: string;
  createdAt: string;
}

export default function MyDonations() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);

  // Mock donations data
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: '1',
      name: 'Paracetamol 500mg',
      category: 'Medicine',
      quantity: 24,
      expiryDate: '2024-12-31',
      description: 'Unopened box of paracetamol tablets, excellent for fever and pain relief.',
      status: 'active',
      requests: 2,
      imageUrl: '/api/placeholder/200/150',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      name: 'Blood Pressure Monitor',
      category: 'Equipment',
      quantity: 1,
      expiryDate: '2025-06-15',
      description: 'Digital blood pressure monitor, barely used with original box.',
      status: 'requested',
      requests: 1,
      imageUrl: '/api/placeholder/200/150',
      createdAt: '2024-01-08'
    },
    {
      id: '3',
      name: 'Vitamin D3 Supplements',
      category: 'Supplements',
      quantity: 60,
      expiryDate: '2024-08-20',
      description: 'Sealed bottle of vitamin D3 tablets.',
      status: 'donated',
      requests: 0,
      imageUrl: '/api/placeholder/200/150',
      createdAt: '2024-01-05'
    }
  ]);

  // Redirect if not a donor
  if (!user || user.role !== 'donor') {
    navigate('/dashboard');
    return null;
  }

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === "all" || donation.category === categoryFilter;
    const matchesStatus = !statusFilter || statusFilter === "all" || donation.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'requested': return 'bg-yellow-100 text-yellow-800';
      case 'donated': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = (donationId: string) => {
    if (confirm('Are you sure you want to delete this donation?')) {
      setDonations(prev => prev.filter(d => d.id !== donationId));
    }
  };

  const handleEdit = (donationId: string) => {
    navigate(`/edit-donation/${donationId}`);
  };

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
            <h1 className="text-3xl font-bold text-gray-900">My Donations</h1>
            <p className="text-gray-600 mt-2">Manage your donated items and track requests</p>
          </div>
          <Button asChild className="mt-4 sm:mt-0">
            <Link to="/add-donation">
              <Plus className="h-4 w-4 mr-2" />
              Add New Donation
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search donations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                  <SelectItem value="Equipment">Medical Equipment</SelectItem>
                  <SelectItem value="Supplies">Medical Supplies</SelectItem>
                  <SelectItem value="Devices">Medical Devices</SelectItem>
                  <SelectItem value="Supplements">Health Supplements</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="requested">Requested</SelectItem>
                  <SelectItem value="donated">Donated</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-sm text-gray-600 flex items-center">
                {filteredDonations.length} of {donations.length} donations
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <Card key={donation.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* Image */}
                {donation.imageUrl && (
                  <img
                    src={donation.imageUrl}
                    alt={donation.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{donation.name}</h3>
                    <Badge className={getStatusColor(donation.status)}>
                      {donation.status}
                    </Badge>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><span className="font-medium">Category:</span> {donation.category}</p>
                    <p><span className="font-medium">Quantity:</span> {donation.quantity}</p>
                    <p><span className="font-medium">Expires:</span> {donation.expiryDate}</p>
                    <p><span className="font-medium">Requests:</span> {donation.requests}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                    {donation.description}
                  </p>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedDonation(donation)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{donation.name}</DialogTitle>
                          <DialogDescription>
                            Donation details and current status
                          </DialogDescription>
                        </DialogHeader>
                        {selectedDonation && (
                          <div className="space-y-4">
                            {selectedDonation.imageUrl && (
                              <img
                                src={selectedDonation.imageUrl}
                                alt={selectedDonation.name}
                                className="w-full h-64 object-cover rounded-lg"
                              />
                            )}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p><span className="font-medium">Category:</span> {selectedDonation.category}</p>
                                <p><span className="font-medium">Quantity:</span> {selectedDonation.quantity}</p>
                                <p><span className="font-medium">Expiry Date:</span> {selectedDonation.expiryDate}</p>
                                <p><span className="font-medium">Status:</span> {selectedDonation.status}</p>
                              </div>
                              <div>
                                <p><span className="font-medium">Requests:</span> {selectedDonation.requests}</p>
                                <p><span className="font-medium">Created:</span> {selectedDonation.createdAt}</p>
                              </div>
                            </div>
                            <div>
                              <p className="font-medium mb-2">Description:</p>
                              <p className="text-gray-700">{selectedDonation.description}</p>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    {donation.status === 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(donation.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}

                    {donation.requests > 0 && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/requests/${donation.id}`}>
                          <MessageSquare className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}

                    {donation.status !== 'donated' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(donation.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDonations.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {donations.length === 0 ? 'No donations yet' : 'No donations match your filters'}
              </h3>
              <p className="text-gray-600 mb-6">
                {donations.length === 0 
                  ? 'Start making a difference by adding your first donation.'
                  : 'Try adjusting your search criteria or filters.'
                }
              </p>
              {donations.length === 0 ? (
                <Button asChild>
                  <Link to="/add-donation">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Donation
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("all");
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
