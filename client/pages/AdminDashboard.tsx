import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Heart, Shield, Users, Package, AlertTriangle, CheckCircle, XCircle, Eye, BarChart3, Clock, Flag } from "lucide-react";
import { Link } from "react-router-dom";

interface NGO {
  id: string;
  name: string;
  email: string;
  registrationNumber: string;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  location: string;
  website?: string;
  description: string;
  documentsUploaded: boolean;
}

interface PlatformStats {
  totalDonations: number;
  totalNGOs: number;
  totalVolunteers: number;
  totalUsers: number;
  donationsThisMonth: number;
  pendingApprovals: number;
  flaggedContent: number;
  activeListings: number;
}

interface FlaggedContent {
  id: string;
  type: "donation" | "user" | "ngo";
  title: string;
  reportedBy: string;
  reason: string;
  date: string;
  status: "pending" | "resolved" | "dismissed";
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats: PlatformStats = {
    totalDonations: 2847,
    totalNGOs: 156,
    totalVolunteers: 423,
    totalUsers: 1892,
    donationsThisMonth: 234,
    pendingApprovals: 8,
    flaggedContent: 3,
    activeListings: 167
  };

  const pendingNGOs: NGO[] = [
    {
      id: "1",
      name: "Hope Medical Foundation",
      email: "contact@hopemedical.org",
      registrationNumber: "NGO-2024-001",
      status: "pending",
      submittedDate: "2024-01-15",
      location: "Mumbai, Maharashtra",
      website: "https://hopemedical.org",
      description: "Providing healthcare services to underprivileged communities in urban slums.",
      documentsUploaded: true
    },
    {
      id: "2",
      name: "Rural Health Initiative",
      email: "info@ruralhealth.in",
      registrationNumber: "NGO-2024-002",
      status: "pending",
      submittedDate: "2024-01-14",
      location: "Bangalore, Karnataka",
      description: "Mobile healthcare units serving remote villages in South India.",
      documentsUploaded: true
    },
    {
      id: "3",
      name: "Community Care Network",
      email: "admin@communitycare.org",
      registrationNumber: "NGO-2024-003",
      status: "pending",
      submittedDate: "2024-01-13",
      location: "Delhi, NCR",
      website: "https://communitycare.org",
      description: "Emergency medical aid and disaster relief operations across North India.",
      documentsUploaded: false
    }
  ];

  const flaggedContent: FlaggedContent[] = [
    {
      id: "1",
      type: "donation",
      title: "Suspicious medicine listing - Expired antibiotics",
      reportedBy: "Dr. Smith",
      reason: "Donation appears to be expired medication being listed as valid",
      date: "2024-01-16",
      status: "pending"
    },
    {
      id: "2",
      type: "user",
      title: "Fake donor profile - Multiple accounts",
      reportedBy: "NGO Verification Team",
      reason: "User appears to have created multiple accounts with same details",
      date: "2024-01-15",
      status: "pending"
    },
    {
      id: "3",
      type: "ngo",
      title: "Unverified NGO making requests",
      reportedBy: "System Alert",
      reason: "NGO without proper verification trying to claim high-value donations",
      date: "2024-01-14",
      status: "pending"
    }
  ];

  const handleNGOAction = (ngoId: string, action: "approve" | "reject") => {
    console.log(`${action} NGO:`, ngoId);
  };

  const handleFlaggedContent = (contentId: string, action: "resolve" | "dismiss") => {
    console.log(`${action} flagged content:`, contentId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "approved":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-red-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            <span className="text-2xl font-bold text-primary">MedMate</span>
            <Badge variant="secondary" className="bg-red-100 text-red-800 ml-2">
              <Shield className="h-3 w-3 mr-1" />
              Admin
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" asChild>
              <Link to="/">Back to Platform</Link>
            </Button>
            <Button variant="destructive">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage platform operations, verify NGOs, and monitor content quality.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ngo-approvals">NGO Approvals</TabsTrigger>
            <TabsTrigger value="content-moderation">Content Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Package className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalDonations.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total Donations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalNGOs}</p>
                      <p className="text-sm text-gray-600">Verified NGOs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalVolunteers}</p>
                      <p className="text-sm text-gray-600">Active Volunteers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <span>Pending Approvals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.pendingApprovals}</div>
                  <p className="text-gray-600 text-sm mb-4">NGOs waiting for verification</p>
                  <Button className="w-full" onClick={() => setActiveTab("ngo-approvals")}>
                    Review Applications
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Flag className="h-5 w-5 text-red-600" />
                    <span>Flagged Content</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600 mb-2">{stats.flaggedContent}</div>
                  <p className="text-gray-600 text-sm mb-4">Items requiring attention</p>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("content-moderation")}>
                    Moderate Content
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    <span>This Month</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">{stats.donationsThisMonth}</div>
                  <p className="text-gray-600 text-sm mb-4">New donations listed</p>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("analytics")}>
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* NGO Approvals Tab */}
          <TabsContent value="ngo-approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending NGO Applications</CardTitle>
                <CardDescription>
                  Review and approve NGO registrations. Verify documents and legitimacy before approval.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organization</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingNGOs.map((ngo) => (
                      <TableRow key={ngo.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{ngo.name}</p>
                            <p className="text-sm text-gray-600">{ngo.registrationNumber}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{ngo.email}</p>
                            {ngo.website && (
                              <p className="text-xs text-blue-600">{ngo.website}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{ngo.location}</TableCell>
                        <TableCell>
                          {ngo.documentsUploaded ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Uploaded
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">
                              <XCircle className="h-3 w-3 mr-1" />
                              Missing
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{new Date(ngo.submittedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleNGOAction(ngo.id, "approve")}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleNGOAction(ngo.id, "reject")}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Moderation Tab */}
          <TabsContent value="content-moderation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Flagged Content</CardTitle>
                <CardDescription>
                  Review reported content and take appropriate action to maintain platform quality.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flaggedContent.map((item) => (
                    <Card key={item.id} className="border-l-4 border-l-red-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="secondary" className="capitalize">
                                {item.type}
                              </Badge>
                              {getStatusBadge(item.status)}
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{item.reason}</p>
                            <div className="text-xs text-gray-500">
                              Reported by {item.reportedBy} on {new Date(item.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleFlaggedContent(item.id, "resolve")}
                            >
                              Resolve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleFlaggedContent(item.id, "dismiss")}
                            >
                              Dismiss
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Growth charts would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Donation Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Category breakdown charts here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.activeListings}</div>
                    <div className="text-sm text-gray-600">Active Listings</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">87%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">4.8</div>
                    <div className="text-sm text-gray-600">Avg Rating</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">2.3 days</div>
                    <div className="text-sm text-gray-600">Avg Match Time</div>
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
