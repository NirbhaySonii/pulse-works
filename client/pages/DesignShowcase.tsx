import { Heart, Home, Users, Package, Search, BarChart3, User, Settings, MessageSquare, QrCode, Truck, Gift, Shield, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DesignShowcase() {
  const pages = [
    {
      name: "Home Landing",
      description: "Hero section with platform introduction",
      icon: Home,
      color: "bg-green-500",
      features: ["Hero CTA", "How it Works", "Stats", "Features"],
      screenshot: "landing-hero.jpg"
    },
    {
      name: "Authentication",
      description: "Login & Signup with role selection",
      icon: Shield,
      color: "bg-blue-500",
      features: ["Role-based signup", "Demo credentials", "Form validation"],
      screenshot: "auth-pages.jpg"
    },
    {
      name: "Donor Dashboard",
      description: "Overview of donations and requests",
      icon: BarChart3,
      color: "bg-emerald-500",
      features: ["Stats cards", "Recent activity", "Quick actions"],
      screenshot: "donor-dashboard.jpg"
    },
    {
      name: "NGO Dashboard",
      description: "Browse donations and manage requests",
      icon: Users,
      color: "bg-blue-600",
      features: ["Available donations", "Request status", "Impact metrics"],
      screenshot: "ngo-dashboard.jpg"
    },
    {
      name: "Add Donation",
      description: "4-step donation listing process",
      icon: Package,
      color: "bg-green-600",
      features: ["Item details", "Upload images", "Quantity/condition", "Review"],
      screenshot: "add-donation.jpg"
    },
    {
      name: "My Donations",
      description: "Manage and edit existing donations",
      icon: Gift,
      color: "bg-purple-500",
      features: ["Edit/delete", "Status tracking", "Request management"],
      screenshot: "my-donations.jpg"
    },
    {
      name: "Browse Donations",
      description: "NGO interface to find available items",
      icon: Search,
      color: "bg-cyan-500",
      features: ["Search & filter", "Location-based", "Request button"],
      screenshot: "browse-donations.jpg"
    },
    {
      name: "Find Donations Map",
      description: "Interactive map with nearby donations",
      icon: MapPin,
      color: "bg-red-500",
      features: ["Interactive map", "Location filter", "Request form"],
      screenshot: "find-donations.jpg"
    },
    {
      name: "Requests Management",
      description: "Donor interface for incoming requests",
      icon: MessageSquare,
      color: "bg-orange-500",
      features: ["Approve/reject", "Request details", "Communication"],
      screenshot: "requests.jpg"
    },
    {
      name: "My Requests",
      description: "NGO tracking of sent requests",
      icon: MessageSquare,
      color: "bg-indigo-500",
      features: ["Request status", "History", "Follow-up"],
      screenshot: "my-requests.jpg"
    },
    {
      name: "Impact Dashboard",
      description: "Comprehensive analytics and impact metrics",
      icon: BarChart3,
      color: "bg-teal-500",
      features: ["Regional stats", "Category breakdown", "Success stories"],
      screenshot: "impact-dashboard.jpg"
    },
    {
      name: "Profile Management",
      description: "User profile and activity history",
      icon: User,
      color: "bg-pink-500",
      features: ["Edit profile", "Activity history", "Account stats"],
      screenshot: "profile.jpg"
    },
    {
      name: "QR Tracker",
      description: "Donation pickup and verification system",
      icon: QrCode,
      color: "bg-yellow-600",
      features: ["QR scanning", "Pickup verification", "Status updates"],
      screenshot: "qr-tracker.jpg"
    },
    {
      name: "Volunteer Portal",
      description: "Volunteer coordination and management",
      icon: Truck,
      color: "bg-purple-600",
      features: ["Task assignment", "Coordination tools", "Impact tracking"],
      screenshot: "volunteer.jpg"
    },
    {
      name: "Thank You Page",
      description: "Post-donation success and sharing",
      icon: Heart,
      color: "bg-rose-500",
      features: ["Success confirmation", "Impact summary", "Social sharing"],
      screenshot: "thank-you.jpg"
    },
    {
      name: "Admin Dashboard",
      description: "Platform administration and oversight",
      icon: Settings,
      color: "bg-gray-600",
      features: ["User management", "NGO verification", "Platform analytics"],
      screenshot: "admin-dashboard.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-4">
            <Heart className="h-10 w-10 text-primary fill-primary" />
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary">MedMate</h1>
              <p className="text-gray-600">Complete Platform Design Overview</p>
            </div>
          </div>
        </div>
      </header>

      {/* Design System Overview */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              16 Complete Pages • Role-Based Design • Responsive
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Complete Platform Design
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive medical donation platform with dedicated interfaces for Donors, NGOs, Volunteers, and Administrators.
              Every page is designed with user experience and accessibility in mind.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">16</div>
              <div className="text-gray-600">Complete Pages</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4</div>
              <div className="text-gray-600">User Roles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Components</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-gray-600">Responsive</div>
            </div>
          </div>

          {/* Pages Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pages.map((page, index) => {
              const IconComponent = page.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${page.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{page.name}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          Page {index + 1}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-sm">
                      {page.description}
                    </CardDescription>
                    
                    {/* Screenshot Placeholder */}
                    <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <IconComponent className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-xs text-gray-500">Page Preview</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-700 mb-2">Key Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {page.features.map((feature, fIndex) => (
                          <Badge key={fIndex} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Design Principles</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every page follows consistent design principles for optimal user experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Security First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Role-based access control, secure authentication, and data protection across all pages.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>User-Centric</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Intuitive interfaces designed specifically for donors, NGOs, volunteers, and administrators.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Impact Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Comprehensive tracking and analytics to measure and showcase real-world impact.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Explore the Platform?</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Experience all 16 pages of the MedMate platform designed to connect medical donors with communities in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
              View Live Demo
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-primary">
              Download Design Files
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <span className="text-xl font-bold">MedMate</span>
          </div>
          <p className="text-gray-400">
            Complete design system for medical donation platform • 16 responsive pages
          </p>
        </div>
      </footer>
    </div>
  );
}
