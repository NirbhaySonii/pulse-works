import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Heart, MapPin, Search, Filter, Package, Calendar, User, Phone, Mail, MessageSquare, Clock, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Donation {
  id: string;
  itemName: string;
  brand: string;
  category: string;
  quantity: number;
  unit: string;
  condition: string;
  expiryDate: string;
  location: string;
  distance: number;
  donorName: string;
  donorRating: number;
  images: string[];
  tags: string[];
  description: string;
  datePosted: string;
}

export default function FindDonationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [maxDistance, setMaxDistance] = useState([10]);
  const [sortBy, setSortBy] = useState("distance");
  const [viewMode, setViewMode] = useState<"map" | "list">("list");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock donation data
  const mockDonations: Donation[] = [
    {
      id: "1",
      itemName: "Paracetamol 500mg",
      brand: "Tylenol",
      category: "medicine",
      quantity: 24,
      unit: "tablets",
      condition: "new",
      expiryDate: "2025-08-15",
      location: "Downtown Medical Center",
      distance: 2.3,
      donorName: "Dr. Sarah Johnson",
      donorRating: 4.8,
      images: ["/api/placeholder/300/200"],
      tags: ["pain relief", "fever"],
      description: "Unopened box of Tylenol, extra strength. Original packaging intact.",
      datePosted: "2024-01-15"
    },
    {
      id: "2",
      itemName: "Blood Pressure Monitor",
      brand: "Omron",
      category: "medical-device",
      quantity: 1,
      unit: "piece",
      condition: "excellent",
      expiryDate: "2026-12-01",
      location: "Riverside Community",
      distance: 4.7,
      donorName: "Michael Chen",
      donorRating: 4.9,
      images: ["/api/placeholder/300/200"],
      tags: ["monitoring", "cardiovascular"],
      description: "Digital blood pressure monitor with large display. Barely used, includes original box and manual.",
      datePosted: "2024-01-14"
    },
    {
      id: "3",
      itemName: "Insulin Syringes",
      brand: "BD",
      category: "medical-device",
      quantity: 50,
      unit: "pieces",
      condition: "new",
      expiryDate: "2025-06-30",
      location: "Northside Clinic",
      distance: 6.2,
      donorName: "City Health Pharmacy",
      donorRating: 5.0,
      images: ["/api/placeholder/300/200"],
      tags: ["diabetes", "injection"],
      description: "Sterile insulin syringes, 1ml capacity. Sealed boxes, perfect for diabetes management.",
      datePosted: "2024-01-13"
    }
  ];

  const filteredDonations = mockDonations.filter(donation => {
    const matchesSearch = donation.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !categoryFilter || categoryFilter === "all" || donation.category === categoryFilter;
    const matchesCondition = !conditionFilter || conditionFilter === "all" || donation.condition === conditionFilter;
    const matchesDistance = donation.distance <= maxDistance[0];

    return matchesSearch && matchesCategory && matchesCondition && matchesDistance;
  });

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new": return "bg-green-100 text-green-800";
      case "excellent": return "bg-blue-100 text-blue-800";
      case "good": return "bg-yellow-100 text-yellow-800";
      case "fair": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    return <Package className="h-4 w-4" />;
  };

  const handleRequestDonation = (donation: Donation) => {
    setSelectedDonation(donation);
    setRequestMessage("");
    setUrgencyLevel("");
    setShowSuccess(false);
  };

  const handleSubmitRequest = async () => {
    if (!selectedDonation || !requestMessage.trim() || !urgencyLevel) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Request submitted:", {
      donationId: selectedDonation.id,
      donationName: selectedDonation.itemName,
      donorName: selectedDonation.donorName,
      message: requestMessage,
      urgency: urgencyLevel
    });

    setIsSubmitting(false);
    setShowSuccess(true);

    // Close modal after 2 seconds
    setTimeout(() => {
      setSelectedDonation(null);
      setRequestMessage("");
      setUrgencyLevel("");
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            <span className="text-2xl font-bold text-primary">MedMate</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/donate" className="text-gray-600 hover:text-primary transition-colors">Donate</Link>
            <Link to="/find-donations" className="text-primary font-medium">Find Donations</Link>
            <Link to="/volunteer" className="text-gray-600 hover:text-primary transition-colors">Volunteer</Link>
            <Link to="/impact" className="text-gray-600 hover:text-primary transition-colors">Impact</Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Nearby Donations</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover available medical donations in your area. Filter by type, distance, and condition to find exactly what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Medicine, device name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                    <SelectItem value="medical-device">Medical Device</SelectItem>
                    <SelectItem value="supplement">Health Supplement</SelectItem>
                    <SelectItem value="first-aid">First Aid Supplies</SelectItem>
                    <SelectItem value="mobility">Mobility Equipment</SelectItem>
                  </SelectContent>
                </Select>
                </div>

                {/* Condition */}
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select value={conditionFilter} onValueChange={setConditionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any condition</SelectItem>
                    <SelectItem value="new">New/Unopened</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
                </div>

                {/* Distance */}
                <div className="space-y-2">
                  <Label>Max Distance: {maxDistance[0]} km</Label>
                  <Slider
                    value={maxDistance}
                    onValueChange={setMaxDistance}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <Label>Sort by</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="date">Date Posted</SelectItem>
                      <SelectItem value="condition">Condition</SelectItem>
                      <SelectItem value="expiry">Expiry Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Toggle */}
                <div className="space-y-2">
                  <Label>View</Label>
                  <div className="flex space-x-2">
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      onClick={() => setViewMode("list")}
                      className="flex-1"
                    >
                      List
                    </Button>
                    <Button
                      variant={viewMode === "map" ? "default" : "outline"}
                      onClick={() => setViewMode("map")}
                      className="flex-1"
                    >
                      Map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredDonations.length} donations found
              </h2>
              <Badge variant="secondary" className="text-sm">
                Within {maxDistance[0]} km
              </Badge>
            </div>

            {viewMode === "map" ? (
              /* Map View Placeholder */
              <Card className="h-96 mb-6">
                <CardContent className="p-0 h-full">
                  <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map View</h3>
                      <p className="text-gray-600 mb-4">Leaflet.js integration would display donation locations here</p>
                      <Button onClick={() => setViewMode("list")}>
                        Switch to List View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredDonations.map((donation) => (
                  <Card key={donation.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Image */}
                        <div className="md:col-span-1">
                          <img
                            src="/api/placeholder/200/150"
                            alt={donation.itemName}
                            className="w-full h-32 object-cover rounded-lg border"
                          />
                        </div>

                        {/* Details */}
                        <div className="md:col-span-2 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{donation.itemName}</h3>
                              <p className="text-gray-600">{donation.brand}</p>
                            </div>
                            <Badge className={getConditionColor(donation.condition)}>
                              {donation.condition}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              {getCategoryIcon(donation.category)}
                              <span>{donation.quantity} {donation.unit}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Exp: {new Date(donation.expiryDate).toLocaleDateString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{donation.distance} km away</span>
                            </span>
                          </div>

                          <p className="text-gray-600 text-sm line-clamp-2">{donation.description}</p>

                          <div className="flex flex-wrap gap-1">
                            {donation.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Donor Info */}
                          <div className="flex items-center space-x-2 pt-2 border-t">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{donation.donorName}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{donation.donorRating}</span>
                            </div>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-400">
                              Posted {new Date(donation.datePosted).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-1 flex flex-col space-y-2">
                          <Button 
                            className="w-full"
                            onClick={() => handleRequestDonation(donation)}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Request Item
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                          <Button variant="ghost" className="w-full text-xs">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredDonations.length === 0 && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your filters or expanding your search radius.
                      </p>
                      <Button variant="outline" onClick={() => {
                        setSearchTerm("");
                        setCategoryFilter("all");
                        setConditionFilter("all");
                        setMaxDistance([25]);
                      }}>
                        Clear Filters
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Request Donation</CardTitle>
              <CardDescription>
                Send a request to {selectedDonation.donorName} for {selectedDonation.itemName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Request Sent Successfully!</h3>
                  <p className="text-green-700">The donor will be notified and will respond soon.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message to Donor *</Label>
                    <textarea
                      id="message"
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows={4}
                      placeholder="Hi! I'm interested in your donation. Our NGO helps..."
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level *</Label>
                    <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Can wait</SelectItem>
                        <SelectItem value="medium">Medium - Needed soon</SelectItem>
                        <SelectItem value="high">High - Urgent need</SelectItem>
                        <SelectItem value="critical">Critical - Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setSelectedDonation(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={handleSubmitRequest}
                      disabled={isSubmitting || !requestMessage.trim() || !urgencyLevel}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Request
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
