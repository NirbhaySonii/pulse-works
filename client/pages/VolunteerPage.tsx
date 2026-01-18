import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Users, Truck, Clock, MapPin, Star, CheckCircle, Calendar, Package, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface VolunteerOpportunity {
  id: string;
  title: string;
  type: "delivery" | "coordination" | "verification" | "outreach";
  location: string;
  timeCommitment: string;
  urgency: "low" | "medium" | "high";
  description: string;
  skills: string[];
  date: string;
  coordinator: string;
  volunteersNeeded: number;
  volunteersJoined: number;
}

interface VolunteerStats {
  hoursContributed: number;
  deliveriesCompleted: number;
  peopleHelped: number;
  rating: number;
  badgesEarned: string[];
}

export default function VolunteerPage() {
  const [activeTab, setActiveTab] = useState("opportunities");

  // Mock volunteer stats
  const volunteerStats: VolunteerStats = {
    hoursContributed: 45,
    deliveriesCompleted: 12,
    peopleHelped: 48,
    rating: 4.9,
    badgesEarned: ["Helper", "Reliable Volunteer", "Community Champion"]
  };

  // Mock volunteer opportunities
  const opportunities: VolunteerOpportunity[] = [
    {
      id: "1",
      title: "Medical Supply Delivery - Urgent",
      type: "delivery",
      location: "Downtown to Riverside Community",
      timeCommitment: "2-3 hours",
      urgency: "high",
      description: "Deliver critical insulin supplies to diabetic patients. Vehicle required.",
      skills: ["Driving", "Reliable transport"],
      date: "2024-01-18",
      coordinator: "Sarah Johnson",
      volunteersNeeded: 1,
      volunteersJoined: 0
    },
    {
      id: "2",
      title: "NGO Verification Visit",
      type: "verification",
      location: "Hope Medical Foundation - Mumbai",
      timeCommitment: "4-5 hours",
      urgency: "medium",
      description: "Visit NGO facilities to verify operations and document processes for admin approval.",
      skills: ["Documentation", "Communication", "Assessment"],
      date: "2024-01-20",
      coordinator: "Michael Chen",
      volunteersNeeded: 2,
      volunteersJoined: 1
    },
    {
      id: "3",
      title: "Community Health Awareness",
      type: "outreach",
      location: "Local Community Center",
      timeCommitment: "3-4 hours",
      urgency: "low",
      description: "Help spread awareness about the donation platform and healthcare access.",
      skills: ["Public speaking", "Healthcare knowledge"],
      date: "2024-01-22",
      coordinator: "Dr. Priya Sharma",
      volunteersNeeded: 5,
      volunteersJoined: 3
    },
    {
      id: "4",
      title: "Donation Coordination",
      type: "coordination",
      location: "Various locations",
      timeCommitment: "Flexible",
      urgency: "medium",
      description: "Help coordinate between donors and NGOs, verify donations, and manage pickup schedules.",
      skills: ["Organization", "Communication", "Scheduling"],
      date: "Ongoing",
      coordinator: "Platform Team",
      volunteersNeeded: 10,
      volunteersJoined: 7
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "delivery": return <Truck className="h-4 w-4" />;
      case "coordination": return <Users className="h-4 w-4" />;
      case "verification": return <CheckCircle className="h-4 w-4" />;
      case "outreach": return <Heart className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const handleJoinOpportunity = (opportunityId: string) => {
    console.log("Joining opportunity:", opportunityId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
            <Link to="/volunteer" className="text-primary font-medium">Volunteer</Link>
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
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Network</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our community of volunteers helping coordinate donations and amplify impact across communities.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{volunteerStats.hoursContributed}</div>
              <div className="text-sm text-gray-600">Hours Contributed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{volunteerStats.deliveriesCompleted}</div>
              <div className="text-sm text-gray-600">Deliveries Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{volunteerStats.peopleHelped}</div>
              <div className="text-sm text-gray-600">People Helped</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <div className="text-2xl font-bold text-yellow-600">{volunteerStats.rating}</div>
              </div>
              <div className="text-sm text-gray-600">Volunteer Rating</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="my-activities">My Activities</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Volunteer Opportunities</CardTitle>
                <CardDescription>
                  Find volunteer opportunities that match your skills and availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {opportunities.map((opportunity) => (
                    <Card key={opportunity.id} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="secondary" className="flex items-center space-x-1">
                                {getTypeIcon(opportunity.type)}
                                <span className="capitalize">{opportunity.type}</span>
                              </Badge>
                              <Badge className={getUrgencyColor(opportunity.urgency)}>
                                {opportunity.urgency} priority
                              </Badge>
                            </div>
                            
                            <h4 className="font-semibold text-gray-900 mb-2">{opportunity.title}</h4>
                            <p className="text-gray-600 text-sm mb-3">{opportunity.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{opportunity.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{opportunity.timeCommitment}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{opportunity.date === "Ongoing" ? "Ongoing" : new Date(opportunity.date).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {opportunity.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>Coordinator: {opportunity.coordinator}</span>
                              <span>{opportunity.volunteersJoined}/{opportunity.volunteersNeeded} volunteers</span>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2 ml-4">
                            <Button 
                              size="sm"
                              onClick={() => handleJoinOpportunity(opportunity.id)}
                              disabled={opportunity.volunteersJoined >= opportunity.volunteersNeeded}
                            >
                              {opportunity.volunteersJoined >= opportunity.volunteersNeeded ? "Full" : "Join"}
                            </Button>
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4" />
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

          {/* My Activities Tab */}
          <TabsContent value="my-activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Volunteer Activities</CardTitle>
                <CardDescription>
                  Track your ongoing and completed volunteer work
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-blue-900">Medicine Delivery - In Progress</h4>
                          <p className="text-sm text-blue-700">Delivering insulin to Hope Medical Foundation</p>
                          <p className="text-xs text-blue-600 mt-1">Started: Today, 2:00 PM</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">NGO Verification Completed</h4>
                          <p className="text-sm text-gray-600">Verified Rural Health Initiative documentation</p>
                          <p className="text-xs text-gray-500 mt-1">Completed: Jan 15, 2024</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Community Outreach Event</h4>
                          <p className="text-sm text-gray-600">Health awareness session at community center</p>
                          <p className="text-xs text-gray-500 mt-1">Completed: Jan 12, 2024</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Volunteer Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-1">{volunteerStats.peopleHelped}</div>
                    <div className="text-sm text-purple-700">People Directly Helped</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-gray-800">₹12,450</div>
                      <div className="text-xs text-gray-600">Value Facilitated</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-gray-800">8.2kg</div>
                      <div className="text-xs text-gray-600">CO₂ Saved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements & Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {volunteerStats.badgesEarned.map((badge, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-yellow-800">{badge}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-2">Next Achievement</h4>
                    <div className="bg-gray-100 rounded-full h-2 mb-1">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-xs text-gray-600">3 more deliveries to earn "Delivery Expert" badge</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Community</CardTitle>
                <CardDescription>
                  Connect with other volunteers and share experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Top Volunteers This Month</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-2 bg-gold-50 rounded-lg border border-yellow-200">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                        <div className="flex-1">
                          <p className="font-medium">Sarah M.</p>
                          <p className="text-xs text-gray-600">28 hours • 15 deliveries</p>
                        </div>
                        <Star className="h-4 w-4 text-yellow-400" />
                      </div>
                      
                      <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                        <div className="flex-1">
                          <p className="font-medium">Alex K.</p>
                          <p className="text-xs text-gray-600">22 hours • 12 deliveries</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-2 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                        <div className="flex-1">
                          <p className="font-medium">You!</p>
                          <p className="text-xs text-gray-600">18 hours • 8 deliveries</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Community Stats</h4>
                    <div className="space-y-3">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">423</div>
                        <div className="text-sm text-blue-700">Active Volunteers</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">1,247</div>
                        <div className="text-sm text-green-700">Total Deliveries</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">4.8★</div>
                        <div className="text-sm text-purple-700">Avg Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
