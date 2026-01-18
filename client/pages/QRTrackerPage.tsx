import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, QrCode, Scan, Package, CheckCircle, Clock, MapPin, User, Calendar, Camera, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface DonationTracking {
  id: string;
  donationId: string;
  itemName: string;
  donor: string;
  ngo: string;
  status: "pending" | "approved" | "qr-generated" | "in-transit" | "delivered" | "completed";
  qrCode?: string;
  requestDate: string;
  approvalDate?: string;
  pickupDate?: string;
  deliveryDate?: string;
  location: string;
  notes?: string;
}

interface QRScanResult {
  success: boolean;
  donationId?: string;
  itemName?: string;
  donor?: string;
  ngo?: string;
  error?: string;
}

export default function QRTrackerPage() {
  const [activeTab, setActiveTab] = useState("scan");
  const [scanResult, setScanResult] = useState<QRScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Mock tracking data
  const trackingData: DonationTracking[] = [
    {
      id: "1",
      donationId: "DON-2024-001",
      itemName: "Paracetamol 500mg (24 tablets)",
      donor: "Dr. Sarah Johnson",
      ngo: "Hope Medical Foundation",
      status: "qr-generated",
      qrCode: "QR123456789",
      requestDate: "2024-01-15",
      approvalDate: "2024-01-16",
      location: "Downtown Medical Center",
      notes: "Pickup arranged for tomorrow 2 PM"
    },
    {
      id: "2",
      donationId: "DON-2024-002",
      itemName: "Blood Pressure Monitor",
      donor: "Michael Chen",
      ngo: "Rural Health Initiative",
      status: "in-transit",
      qrCode: "QR987654321",
      requestDate: "2024-01-14",
      approvalDate: "2024-01-15",
      pickupDate: "2024-01-16",
      location: "Riverside Community",
      notes: "Volunteer pickup completed, en route to NGO"
    },
    {
      id: "3",
      donationId: "DON-2024-003",
      itemName: "Insulin Syringes (50 pieces)",
      donor: "City Health Pharmacy",
      ngo: "Community Care Network",
      status: "completed",
      qrCode: "QR555666777",
      requestDate: "2024-01-12",
      approvalDate: "2024-01-13",
      pickupDate: "2024-01-14",
      deliveryDate: "2024-01-15",
      location: "Northside Clinic"
    }
  ];

  const handleQRScan = () => {
    setIsScanning(true);
    // Simulate QR scan delay
    setTimeout(() => {
      setIsScanning(false);
      // Mock successful scan
      setScanResult({
        success: true,
        donationId: "DON-2024-001",
        itemName: "Paracetamol 500mg (24 tablets)",
        donor: "Dr. Sarah Johnson",
        ngo: "Hope Medical Foundation"
      });
    }, 2000);
  };

  const handleStatusUpdate = (trackingId: string, newStatus: string) => {
    console.log("Updating status:", trackingId, newStatus);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-blue-100 text-blue-800";
      case "qr-generated": return "bg-purple-100 text-purple-800";
      case "in-transit": return "bg-orange-100 text-orange-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "approved": return <CheckCircle className="h-4 w-4" />;
      case "qr-generated": return <QrCode className="h-4 w-4" />;
      case "in-transit": return <Package className="h-4 w-4" />;
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            <span className="text-2xl font-bold text-primary">MedMate</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/donate" className="text-gray-600 hover:text-primary transition-colors">Donate</Link>
            <Link to="/find-donations" className="text-gray-600 hover:text-primary transition-colors">Find Donations</Link>
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
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Scan & Pickup Tracker</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Scan QR codes to verify donations and track the entire pickup and delivery process in real-time.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scan">QR Scanner</TabsTrigger>
            <TabsTrigger value="track">Track Donations</TabsTrigger>
            <TabsTrigger value="generate">Generate QR</TabsTrigger>
          </TabsList>

          {/* QR Scanner Tab */}
          <TabsContent value="scan" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Scan QR Code</CardTitle>
                  <CardDescription>
                    Use your camera to scan the QR code on donation packages for verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Camera View */}
                  <div className="aspect-square max-w-sm mx-auto bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    {isScanning ? (
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Scanning...</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">Position QR code within the frame</p>
                        <Button onClick={handleQRScan} className="bg-purple-600 hover:bg-purple-700">
                          <Scan className="h-4 w-4 mr-2" />
                          Start Scanning
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Scan Result */}
                  {scanResult && (
                    <Card className={`border-2 ${scanResult.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                      <CardContent className="p-4">
                        {scanResult.success ? (
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <span className="font-medium text-green-800">Scan Successful!</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <p><span className="font-medium">Donation ID:</span> {scanResult.donationId}</p>
                              <p><span className="font-medium">Item:</span> {scanResult.itemName}</p>
                              <p><span className="font-medium">Donor:</span> {scanResult.donor}</p>
                              <p><span className="font-medium">NGO:</span> {scanResult.ngo}</p>
                            </div>
                            <div className="flex space-x-2 pt-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                Confirm Pickup
                              </Button>
                              <Button size="sm" variant="outline">
                                Mark as Delivered
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <AlertCircle className="h-5 w-5 text-red-600" />
                              <span className="font-medium text-red-800">Scan Failed</span>
                            </div>
                            <p className="text-red-700 text-sm">{scanResult.error}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Instructions */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Scanning Instructions</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Ensure good lighting for clear QR code visibility</li>
                        <li>• Hold device steady and center the QR code in frame</li>
                        <li>• Keep about 6-8 inches distance from the code</li>
                        <li>• Wait for the automatic scan confirmation</li>
                      </ul>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Track Donations Tab */}
          <TabsContent value="track" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation Tracking</CardTitle>
                <CardDescription>
                  Monitor the status of all donations from request to final delivery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.map((item) => (
                    <Card key={item.id} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="secondary" className="font-mono text-xs">
                                {item.donationId}
                              </Badge>
                              <Badge className={getStatusColor(item.status)}>
                                {getStatusIcon(item.status)}
                                <span className="ml-1 capitalize">{item.status.replace('-', ' ')}</span>
                              </Badge>
                            </div>
                            
                            <h4 className="font-semibold text-gray-900 mb-1">{item.itemName}</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>Donor: {item.donor}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Package className="h-4 w-4" />
                                <span>NGO: {item.ngo}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{item.location}</span>
                              </div>
                            </div>

                            {/* Timeline */}
                            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-2">
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>Requested: {new Date(item.requestDate).toLocaleDateString()}</span>
                              </span>
                              {item.approvalDate && (
                                <span className="flex items-center space-x-1">
                                  <CheckCircle className="h-3 w-3" />
                                  <span>Approved: {new Date(item.approvalDate).toLocaleDateString()}</span>
                                </span>
                              )}
                              {item.pickupDate && (
                                <span className="flex items-center space-x-1">
                                  <Package className="h-3 w-3" />
                                  <span>Picked up: {new Date(item.pickupDate).toLocaleDateString()}</span>
                                </span>
                              )}
                              {item.deliveryDate && (
                                <span className="flex items-center space-x-1">
                                  <CheckCircle className="h-3 w-3" />
                                  <span>Delivered: {new Date(item.deliveryDate).toLocaleDateString()}</span>
                                </span>
                              )}
                            </div>

                            {item.notes && (
                              <p className="text-sm text-gray-700 italic">{item.notes}</p>
                            )}
                          </div>

                          <div className="flex flex-col space-y-2 ml-4">
                            {item.qrCode && (
                              <div className="w-16 h-16 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
                                <QrCode className="h-8 w-8 text-gray-600" />
                              </div>
                            )}
                            <Button size="sm" variant="outline">
                              Update Status
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Generate QR Tab */}
          <TabsContent value="generate" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Generate QR Code</CardTitle>
                  <CardDescription>
                    Create secure QR codes for approved donation requests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Approved Donation</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="">Choose a donation to generate QR code...</option>
                        <option value="DON-2024-001">DON-2024-001 - Paracetamol for Hope Medical Foundation</option>
                        <option value="DON-2024-004">DON-2024-004 - Thermometer for Rural Health Initiative</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pickup Instructions (Optional)</label>
                      <textarea 
                        className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                        rows={3}
                        placeholder="Special instructions for pickup (timing, contact person, location details...)"
                      />
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate Secure QR Code
                    </Button>
                  </div>

                  {/* Generated QR Preview */}
                  <Card className="bg-gray-50">
                    <CardContent className="p-6 text-center">
                      <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <QrCode className="h-24 w-24 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-4">QR code will appear here once generated</p>
                      <div className="flex space-x-2 justify-center">
                        <Button size="sm" variant="outline" disabled>
                          Download QR
                        </Button>
                        <Button size="sm" variant="outline" disabled>
                          Print Label
                        </Button>
                        <Button size="sm" variant="outline" disabled>
                          Send via Email
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Security Notice */}
                  <Card className="bg-amber-50 border-amber-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-amber-800 mb-2">Security Features</h4>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Each QR code is unique and tied to a specific donation</li>
                        <li>• Codes expire after successful pickup or 30 days</li>
                        <li>• All scans are logged with timestamp and location</li>
                        <li>• Invalid or tampered codes are automatically flagged</li>
                      </ul>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
