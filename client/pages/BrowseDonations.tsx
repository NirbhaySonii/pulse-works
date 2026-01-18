import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, Search, ArrowLeft, Package, User, Calendar, MessageSquare, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Donation {
  id: string;
  name: string;
  category: string;
  quantity: number;
  expiryDate: string;
  description: string;
  donorName: string;
  donorRating: number;
  location: string;
  imageUrl?: string;
  createdAt: string;
}

export default function BrowseDonations() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock available donations
  const [donations] = useState<Donation[]>([
    {
      id: '1',
      name: 'Paracetamol 500mg',
      category: 'Medicine',
      quantity: 24,
      expiryDate: '2024-12-31',
      description: 'Unopened box of paracetamol tablets, excellent for fever and pain relief.',
      donorName: 'Dr. Sarah Johnson',
      donorRating: 4.8,
      location: 'Downtown Medical Center',
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
      donorName: 'Michael Chen',
      donorRating: 4.9,
      location: 'Riverside Community',
      imageUrl: '/api/placeholder/200/150',
      createdAt: '2024-01-08'
    },
    {
      id: '3',
      name: 'Insulin Syringes',
      category: 'Supplies',
      quantity: 50,
      expiryDate: '2025-03-20',
      description: 'Sterile insulin syringes, sealed packaging.',
      donorName: 'City Health Pharmacy',
      donorRating: 5.0,
      location: 'Medical District',
      imageUrl: '/api/placeholder/200/150',
      createdAt: '2024-01-07'
    },
    {
      id: '4',
      name: 'Wheelchair',
      category: 'Equipment',
      quantity: 1,
      expiryDate: '2030-01-01',
      description: 'Manual wheelchair in excellent condition, barely used.',
      donorName: 'Hope Medical Foundation',
      donorRating: 4.7,
      location: 'Northside Clinic',
      imageUrl: '/api/placeholder/200/150',
      createdAt: '2024-01-06'
    },
    {
      id: '5',
      name: 'Vitamin B12 Injection',
      category: 'Medicine',
      quantity: 10,
      expiryDate: '2024-10-15',
      description: 'Vitamin B12 injection vials, unopened and refrigerated.',
      donorName: 'Dr. Amanda Lee',
      donorRating: 4.6,
      location: 'Central Hospital',
      imageUrl: '/api/placeholder/200/150',
      createdAt: '2024-01-05'
    }
  ]);

  // Redirect if not an NGO
  if (!user || user.role !== 'ngo') {
    navigate('/dashboard');
    return null;
  }

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.donorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === "all" || donation.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleRequestDonation = async () => {
    if (!selectedDonation || !requestMessage.trim()) return;
    
    setIsRequesting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Request sent:", {
      donationId: selectedDonation.id,
      message: requestMessage,
      ngoName: user.name
    });
    
    setIsRequesting(false);
    setShowSuccess(true);
    setRequestMessage("");
    
    // Close dialog after showing success
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedDonation(null);
    }, 2000);
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryBadge = (expiryDate: string) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 30) {
      return <Badge className="bg-red-100 text-red-800">Expires soon</Badge>;
    } else if (days < 90) {
      return <Badge className="bg-yellow-100 text-yellow-800">Moderate expiry</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800">Good expiry</Badge>;
    }
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Donations</h1>
          <p className="text-gray-600 mt-2">Find available medical donations from verified donors</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <div className="text-sm text-gray-600 flex items-center">
                {filteredDonations.length} donations available
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
                    {getExpiryBadge(donation.expiryDate)}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><span className="font-medium">Category:</span> {donation.category}</p>
                    <p><span className="font-medium">Quantity:</span> {donation.quantity}</p>
                    <p><span className="font-medium">Expires:</span> {donation.expiryDate}</p>
                    <p><span className="font-medium">Location:</span> {donation.location}</p>
                  </div>

                  {/* Donor Info */}
                  <div className="flex items-center space-x-2 mb-4 p-2 bg-gray-50 rounded">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{donation.donorName}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm">{donation.donorRating}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                    {donation.description}
                  </p>

                  {/* Request Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full"
                        onClick={() => setSelectedDonation(donation)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Request Donation
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Request: {donation.name}</DialogTitle>
                        <DialogDescription>
                          Send a request to {donation.donorName} for this donation
                        </DialogDescription>
                      </DialogHeader>
                      
                      {showSuccess ? (
                        <div className="text-center py-8">
                          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-green-800 mb-2">Request Sent Successfully!</h3>
                          <p className="text-green-700">The donor will be notified and will respond soon.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Donation Details */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p><span className="font-medium">Item:</span> {selectedDonation?.name}</p>
                                <p><span className="font-medium">Quantity:</span> {selectedDonation?.quantity}</p>
                                <p><span className="font-medium">Category:</span> {selectedDonation?.category}</p>
                              </div>
                              <div>
                                <p><span className="font-medium">Donor:</span> {selectedDonation?.donorName}</p>
                                <p><span className="font-medium">Location:</span> {selectedDonation?.location}</p>
                                <p><span className="font-medium">Expires:</span> {selectedDonation?.expiryDate}</p>
                              </div>
                            </div>
                          </div>

                          {/* Request Message */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Message to Donor *</label>
                            <Textarea
                              placeholder="Hi! I'm from [Your NGO Name]. We would like to request this donation for our community health program. We serve [number] of beneficiaries and this would help..."
                              value={requestMessage}
                              onChange={(e) => setRequestMessage(e.target.value)}
                              rows={4}
                              required
                            />
                            <p className="text-xs text-gray-500">
                              Include details about your organization and how this donation will be used.
                            </p>
                          </div>

                          {/* NGO Info Display */}
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800">
                              <span className="font-medium">Requesting as:</span> {user.name}
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                              Your profile information will be shared with the donor
                            </p>
                          </div>
                        </div>
                      )}

                      {!showSuccess && (
                        <DialogFooter>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setSelectedDonation(null);
                              setRequestMessage("");
                            }}
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleRequestDonation}
                            disabled={isRequesting || !requestMessage.trim()}
                          >
                            {isRequesting ? "Sending Request..." : "Send Request"}
                          </Button>
                        </DialogFooter>
                      )}
                    </DialogContent>
                  </Dialog>
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
                No donations match your search
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or check back later for new donations.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
