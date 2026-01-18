import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, CheckCircle, Share2, Download, Package, Users, Star, Calendar, MapPin, Award, Gift } from "lucide-react";
import { Link } from "react-router-dom";

interface DonationSummary {
  donationId: string;
  itemName: string;
  quantity: number;
  unit: string;
  category: string;
  recipient: {
    name: string;
    type: "ngo" | "individual";
    location: string;
    beneficiaries: number;
  };
  impact: {
    peopleHelped: number;
    valueEstimate: number;
    co2Saved: number;
    category: string;
  };
  timeline: {
    submitted: string;
    approved: string;
    pickedUp: string;
    delivered: string;
  };
  feedback?: {
    rating: number;
    message: string;
    photos?: string[];
  };
}

export default function ThankYouPage() {
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock donation summary data
  const donationSummary: DonationSummary = {
    donationId: "DON-2024-001",
    itemName: "Paracetamol 500mg",
    quantity: 24,
    unit: "tablets",
    category: "Medicine",
    recipient: {
      name: "Hope Medical Foundation",
      type: "ngo",
      location: "Mumbai, Maharashtra",
      beneficiaries: 150
    },
    impact: {
      peopleHelped: 12,
      valueEstimate: 240,
      co2Saved: 0.5,
      category: "Pain Relief"
    },
    timeline: {
      submitted: "2024-01-15",
      approved: "2024-01-16",
      pickedUp: "2024-01-17",
      delivered: "2024-01-18"
    },
    feedback: {
      rating: 5,
      message: "Thank you so much for this donation! The medicines were distributed to families in our community health program. Your contribution made a real difference.",
      photos: ["/api/placeholder/200/150", "/api/placeholder/200/150"]
    }
  };

  const handleShare = (platform: string) => {
    console.log(`Sharing on ${platform}`);
    setShowShareModal(false);
  };

  const generateCertificate = () => {
    console.log("Generating donation certificate");
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
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You for Making a Difference!</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Your donation has been successfully delivered and is already helping people in need. 
            Here's the impact you've made:
          </p>
          <Badge className="bg-green-100 text-green-800 text-lg px-6 py-2">
            Donation ID: {donationSummary.donationId}
          </Badge>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Impact Summary */}
          <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-800">Your Impact Summary</CardTitle>
              <CardDescription className="text-green-700">
                See the real-world difference your donation has made
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-800">{donationSummary.impact.peopleHelped}</div>
                  <div className="text-sm text-green-700">People Helped</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Gift className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-800">₹{donationSummary.impact.valueEstimate}</div>
                  <div className="text-sm text-blue-700">Value Provided</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-purple-800">{donationSummary.impact.co2Saved}kg</div>
                  <div className="text-sm text-purple-700">CO₂ Saved</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-orange-800">{donationSummary.quantity}</div>
                  <div className="text-sm text-orange-700">{donationSummary.unit} Donated</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donation Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Donation Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{donationSummary.itemName}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Quantity:</span> {donationSummary.quantity} {donationSummary.unit}</p>
                    <p><span className="font-medium">Category:</span> {donationSummary.category}</p>
                    <p><span className="font-medium">Medical Use:</span> {donationSummary.impact.category}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 mb-2">Recipient Organization</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Name:</span> {donationSummary.recipient.name}</p>
                    <p><span className="font-medium">Location:</span> {donationSummary.recipient.location}</p>
                    <p><span className="font-medium">Serves:</span> {donationSummary.recipient.beneficiaries}+ beneficiaries</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Donation Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Donation Submitted</p>
                      <p className="text-xs text-gray-600">{new Date(donationSummary.timeline.submitted).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Request Approved</p>
                      <p className="text-xs text-gray-600">{new Date(donationSummary.timeline.approved).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Item Picked Up</p>
                      <p className="text-xs text-gray-600">{new Date(donationSummary.timeline.pickedUp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Successfully Delivered</p>
                      <p className="text-xs text-gray-600">{new Date(donationSummary.timeline.delivered).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recipient Feedback */}
          {donationSummary.feedback && (
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Message from {donationSummary.recipient.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < donationSummary.feedback!.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600">({donationSummary.feedback.rating}/5 stars)</span>
                </div>
                
                <blockquote className="text-gray-700 italic bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                  "{donationSummary.feedback.message}"
                </blockquote>
                
                {donationSummary.feedback.photos && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Photos from the NGO</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {donationSummary.feedback.photos.map((photo, index) => (
                        <img 
                          key={index}
                          src={photo} 
                          alt={`Impact photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              asChild
            >
              <Link to="/donate">
                <Package className="h-4 w-4 mr-2" />
                Donate Again
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowShareModal(true)}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Your Impact
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={generateCertificate}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
          </div>

          {/* Encourage More Donations */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Make More Impact?</h3>
              <p className="text-gray-600 mb-4">
                Your donation was a success! There are many more people who need your help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link to="/find-donations">
                    <MapPin className="h-4 w-4 mr-2" />
                    See Who Needs Help
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/impact">
                    View Platform Impact
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Share Your Impact</CardTitle>
              <CardDescription>
                Inspire others by sharing your donation success story
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">Share this message:</p>
                <p className="text-sm font-medium">
                  "I just helped {donationSummary.impact.peopleHelped} people by donating {donationSummary.itemName} through @MedMate!
                  Together we can make healthcare accessible for everyone. #MedMate #DonateForHealth"
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleShare('twitter')}
                  className="w-full"
                >
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleShare('facebook')}
                  className="w-full"
                >
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleShare('linkedin')}
                  className="w-full"
                >
                  LinkedIn
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleShare('whatsapp')}
                  className="w-full"
                >
                  WhatsApp
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowShareModal(false)}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
