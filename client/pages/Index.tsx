import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Shield, BarChart3, Users, Package, Truck, QrCode } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 border-green-200">
            Connecting Communities • Saving Lives
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Bridge the Gap Between
            <span className="text-primary block">Surplus & Need</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect donors with unused medicines and medical devices to NGOs and communities in need. 
            Secure, verified, and impactful donation platform with real-time tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-6 text-lg" asChild>
              <Link to="/donate">
                <Package className="mr-2 h-5 w-5" />
                Start Donating
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg" asChild>
              <Link to="/find-donations">
                <MapPin className="mr-2 h-5 w-5" />
                Find Donations
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2,847</div>
              <div className="text-gray-600">Items Donated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">156</div>
              <div className="text-gray-600">NGOs Helped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">12,493</div>
              <div className="text-gray-600">People Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">₹4.2L</div>
              <div className="text-gray-600">Value Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How MedMate Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, secure, and transparent process from donation to delivery
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Donors */}
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-primary">For Donors</CardTitle>
                <CardDescription>Share your unused medicines & devices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">1</div>
                  <div>
                    <h4 className="font-semibold">List Your Donation</h4>
                    <p className="text-sm text-gray-600">Upload details, images, and expiry dates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">2</div>
                  <div>
                    <h4 className="font-semibold">Receive Requests</h4>
                    <p className="text-sm text-gray-600">NGOs request your donations directly</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">3</div>
                  <div>
                    <h4 className="font-semibold">Secure Handover</h4>
                    <p className="text-sm text-gray-600">QR code verification for safe transfer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* NGOs */}
            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl text-accent">For NGOs</CardTitle>
                <CardDescription>Find nearby donations on interactive map</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">1</div>
                  <div>
                    <h4 className="font-semibold">Browse Map</h4>
                    <p className="text-sm text-gray-600">View donations by location and filter needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">2</div>
                  <div>
                    <h4 className="font-semibold">Request Items</h4>
                    <p className="text-sm text-gray-600">Send requests to donors with your needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">3</div>
                  <div>
                    <h4 className="font-semibold">Collect & Impact</h4>
                    <p className="text-sm text-gray-600">Track pickup and measure community impact</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Volunteers */}
            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl text-purple-600">For Volunteers</CardTitle>
                <CardDescription>Help coordinate and deliver donations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">1</div>
                  <div>
                    <h4 className="font-semibold">Join Network</h4>
                    <p className="text-sm text-gray-600">Sign up and verify your volunteer status</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">2</div>
                  <div>
                    <h4 className="font-semibold">Coordinate</h4>
                    <p className="text-sm text-gray-600">Help match donors with NGOs efficiently</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">3</div>
                  <div>
                    <h4 className="font-semibold">Make Impact</h4>
                    <p className="text-sm text-gray-600">See the difference you're making in real-time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with security, transparency, and impact measurement at its core
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Platform</h3>
              <p className="text-gray-600">Admin-verified NGOs and secure donor authentication</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">QR Tracking</h3>
              <p className="text-gray-600">Secure QR codes for donation tracking and verification</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Impact Dashboard</h3>
              <p className="text-gray-600">Real-time analytics and environmental impact tracking</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-600">Volunteers help coordinate and amplify impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of donors, NGOs, and volunteers creating positive impact in communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg" asChild>
              <Link to="/signup">
                Join as Donor
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/signup?role=ngo">
                Register NGO
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-primary fill-primary" />
                <span className="text-xl font-bold">MedMate</span>
              </div>
              <p className="text-gray-400">
                Connecting surplus medical resources with communities in need through secure, verified donations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/donate" className="hover:text-white transition-colors">Donate Items</Link></li>
                <li><Link to="/find-donations" className="hover:text-white transition-colors">Find Donations</Link></li>
                <li><Link to="/volunteer" className="hover:text-white transition-colors">Volunteer</Link></li>
                <li><Link to="/impact" className="hover:text-white transition-colors">Impact Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/safety" className="hover:text-white transition-colors">Safety Guidelines</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/feedback" className="hover:text-white transition-colors">Feedback</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MedMate. All rights reserved. Built with ❤️ for communities in need.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
