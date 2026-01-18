import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, BarChart3, Users, Package, TrendingUp, Globe, Leaf, Award, Calendar, MapPin, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlatformMetrics {
  totalDonations: number;
  totalValue: number;
  peopleHelped: number;
  co2Saved: number;
  ngoPartners: number;
  volunteers: number;
  citiesCovered: number;
  successRate: number;
}

interface RegionalImpact {
  region: string;
  donations: number;
  value: number;
  population: number;
}

interface CategoryBreakdown {
  category: string;
  count: number;
  value: number;
  percentage: number;
}

interface MonthlyData {
  month: string;
  donations: number;
  value: number;
  people: number;
}

export default function ImpactPage() {
  const [timeRange, setTimeRange] = useState("all-time");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock platform metrics
  const metrics: PlatformMetrics = {
    totalDonations: 2847,
    totalValue: 4200000, // in rupees
    peopleHelped: 12493,
    co2Saved: 1250, // in kg
    ngoPartners: 156,
    volunteers: 423,
    citiesCovered: 45,
    successRate: 87
  };

  // Mock regional impact data
  const regionalImpact: RegionalImpact[] = [
    { region: "Mumbai", donations: 567, value: 850000, population: 89000 },
    { region: "Delhi", donations: 434, value: 720000, population: 67000 },
    { region: "Bangalore", donations: 389, value: 650000, population: 56000 },
    { region: "Chennai", donations: 298, value: 480000, population: 45000 },
    { region: "Kolkata", donations: 267, value: 420000, population: 38000 }
  ];

  // Mock category breakdown
  const categoryBreakdown: CategoryBreakdown[] = [
    { category: "Medicines", count: 1456, value: 2100000, percentage: 51 },
    { category: "Medical Equipment", count: 678, value: 1200000, percentage: 24 },
    { category: "Diagnostic Equipment", count: 345, value: 650000, percentage: 12 },
    { category: "First Aid Supplies", count: 234, value: 150000, percentage: 8 },
    { category: "Health Supplements", count: 134, value: 100000, percentage: 5 }
  ];

  // Mock monthly data
  const monthlyData: MonthlyData[] = [
    { month: "Jan", donations: 234, value: 420000, people: 1240 },
    { month: "Feb", donations: 267, value: 380000, people: 1100 },
    { month: "Mar", donations: 298, value: 450000, people: 1350 },
    { month: "Apr", donations: 321, value: 520000, people: 1480 },
    { month: "May", donations: 289, value: 490000, people: 1320 },
    { month: "Jun", donations: 345, value: 580000, people: 1650 }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" asChild className="mr-4">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Heart className="h-8 w-8 text-primary fill-primary mr-2" />
            <span className="text-2xl font-bold text-primary">MedMate</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Impact Dashboard</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Track the real-world impact of donations across communities and environmental metrics.
          </p>
          
          {/* Time Range Selector */}
          <div className="flex justify-center">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{formatNumber(metrics.totalDonations)}</div>
              <div className="text-sm text-gray-600">Total Donations</div>
            </CardContent>
          </Card>

          <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{formatNumber(metrics.peopleHelped)}</div>
              <div className="text-sm text-gray-600">People Helped</div>
            </CardContent>
          </Card>

          <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{formatCurrency(metrics.totalValue)}</div>
              <div className="text-sm text-gray-600">Value Saved</div>
            </CardContent>
          </Card>

          <Card className="text-center border-emerald-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-emerald-600 mb-1">{formatNumber(metrics.co2Saved)}kg</div>
              <div className="text-sm text-gray-600">CO₂ Saved</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="geographic">Geographic</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="stories">Success Stories</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Platform Growth */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                  <CardDescription>Key performance indicators over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">NGO Partners</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{metrics.ngoPartners}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Active Volunteers</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{metrics.volunteers}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Cities Covered</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{metrics.citiesCovered}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Success Rate</span>
                      </div>
                      <span className="text-lg font-bold text-green-700">{metrics.successRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Impact */}
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>Sustainability metrics and waste reduction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="text-3xl font-bold text-emerald-600 mb-1">{metrics.co2Saved}kg</div>
                      <div className="text-sm text-emerald-700">CO₂ Emissions Saved</div>
                      <div className="text-xs text-emerald-600 mt-1">
                        Equivalent to planting {Math.round(metrics.co2Saved / 22)} trees
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-3xl font-bold text-blue-600 mb-1">{formatNumber(metrics.totalDonations)}</div>
                      <div className="text-sm text-blue-700">Items Saved from Waste</div>
                      <div className="text-xs text-blue-600 mt-1">
                        Preventing unnecessary disposal
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-3xl font-bold text-orange-600 mb-1">2.4T</div>
                      <div className="text-sm text-orange-700">Medical Waste Prevented</div>
                      <div className="text-xs text-orange-600 mt-1">
                        Estimated total weight saved
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Impact Trends</CardTitle>
                <CardDescription>Donation and impact trends over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((month, index) => (
                    <div key={month.month} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-center min-w-[60px]">
                        <div className="text-sm font-medium text-gray-700">{month.month}</div>
                        <div className="text-xs text-gray-500">2024</div>
                      </div>
                      <div className="flex-1 grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-blue-600">{month.donations}</div>
                          <div className="text-xs text-gray-600">Donations</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-purple-600">{formatCurrency(month.value)}</div>
                          <div className="text-xs text-gray-600">Value</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">{month.people}</div>
                          <div className="text-xs text-gray-600">People</div>
                        </div>
                      </div>
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                          style={{ width: `${Math.min((month.donations / 400) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Geographic Tab */}
          <TabsContent value="geographic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Impact by Region</CardTitle>
                  <CardDescription>Top performing cities and regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {regionalImpact.map((region, index) => (
                      <div key={region.region} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-400' : 'bg-blue-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{region.region}</span>
                            <span className="text-sm text-gray-600">{region.donations} donations</span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{formatCurrency(region.value)} value</span>
                            <span>{formatNumber(region.population)} people helped</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>National impact visualization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                      <p className="text-gray-700 mb-2 font-medium">Interactive India Map</p>
                      <p className="text-gray-600 text-sm">Showing donation density and impact by state</p>
                      <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
                        <div className="bg-white p-2 rounded border">
                          <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                          <div>High Impact</div>
                        </div>
                        <div className="bg-white p-2 rounded border">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
                          <div>Moderate Impact</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation Categories</CardTitle>
                <CardDescription>Breakdown of donations by medical category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryBreakdown.map((category, index) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.category}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium">{category.count} items</div>
                          <div className="text-xs text-gray-600">{formatCurrency(category.value)}</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                          style={{ width: `${category.percentage}%` }}
                        >
                          <span className="text-white text-xs font-bold">{category.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Success Stories Tab */}
          <TabsContent value="stories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Diabetes Care Program</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        Through donated insulin and glucose meters, Rural Health Initiative was able to 
                        provide continuous care for 45 diabetic patients in remote villages.
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>January 2024</span>
                        <MapPin className="h-3 w-3 ml-2" />
                        <span>Karnataka</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">Emergency Medical Response</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        Donated emergency supplies helped Community Care Network respond to a local 
                        health crisis, providing immediate care to 120+ affected families.
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>December 2023</span>
                        <MapPin className="h-3 w-3 ml-2" />
                        <span>Delhi</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">Maternal Health Initiative</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        Medical equipment donations enabled Hope Medical Foundation to establish 
                        a maternal health clinic serving 200+ expecting mothers in urban slums.
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>November 2023</span>
                        <MapPin className="h-3 w-3 ml-2" />
                        <span>Mumbai</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">Children's Health Camp</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        Donated medicines and vaccines helped organize a children's health camp 
                        that provided immunizations and care to over 300 children.
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>October 2023</span>
                        <MapPin className="h-3 w-3 ml-2" />
                        <span>Chennai</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Be Part of the Impact</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every donation creates a ripple effect of positive change. Join our community and 
              help us reach even more people in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/donate">
                  <Package className="h-5 w-5 mr-2" />
                  Start Donating
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/volunteer">
                  <Users className="h-5 w-5 mr-2" />
                  Become a Volunteer
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
