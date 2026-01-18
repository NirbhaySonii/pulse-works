import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, User, ArrowLeft, Camera, Mail, Phone, MapPin, Calendar, Shield, Activity, CheckCircle, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ActivityItem {
  id: string;
  type: 'donation' | 'request' | 'profile';
  title: string;
  description: string;
  date: string;
  status?: 'success' | 'pending' | 'failed';
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    bio: ""
  });

  // Mock activity data
  const [activities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'donation',
      title: 'Added Paracetamol donation',
      description: 'Listed 24 tablets of Paracetamol 500mg',
      date: '2024-01-15',
      status: 'success'
    },
    {
      id: '2',
      type: 'request',
      title: 'Received donation request',
      description: 'Hope Foundation requested Blood Pressure Monitor',
      date: '2024-01-14',
      status: 'pending'
    },
    {
      id: '3',
      type: 'donation',
      title: 'Donation completed',
      description: 'Vitamin D3 supplements delivered to Community Care',
      date: '2024-01-12',
      status: 'success'
    },
    {
      id: '4',
      type: 'profile',
      title: 'Profile updated',
      description: 'Updated contact information',
      date: '2024-01-10',
      status: 'success'
    }
  ]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSave = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const success = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      });

      if (success) {
        setMessage("Profile updated successfully!");
        setIsEditing(false);
      } else {
        setMessage("Failed to update profile. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      bio: ""
    });
    setIsEditing(false);
    setMessage("");
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'donation': return <Activity className="h-4 w-4 text-green-600" />;
      case 'request': return <Mail className="h-4 w-4 text-blue-600" />;
      case 'profile': return <User className="h-4 w-4 text-purple-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'success': return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed': return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default: return null;
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account information and activity</p>
        </div>

        {/* Message Alert */}
        {message && (
          <Alert className={`mb-6 ${message.includes('success') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            {message.includes('success') ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={message.includes('success') ? 'text-green-800' : 'text-red-800'}>
              {message}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="activity">Activity History</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Profile Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Profile Information</span>
                    </CardTitle>
                    <CardDescription>
                      Manage your personal information and preferences
                    </CardDescription>
                  </div>
                  {!isEditing && (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    {user.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt="Profile" 
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={user.role === 'donor' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                        {user.role === 'donor' ? 'Donor' : 'NGO'}
                      </Badge>
                      {user.verified && (
                        <Badge className="bg-purple-100 text-purple-800">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    {isEditing && (
                      <Button variant="outline" size="sm" className="mt-2">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        disabled={true}
                        className="pl-10 bg-gray-50"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Member Since</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        value={new Date(user.createdAt).toLocaleDateString()}
                        disabled={true}
                        className="pl-10 bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                      className="pl-10"
                      placeholder="Your address"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio (Optional)</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    placeholder={user.role === 'donor' 
                      ? "Tell others about your motivation to donate..."
                      : "Describe your organization and mission..."
                    }
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex space-x-4 pt-4">
                    <Button onClick={handleSave} disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Account Statistics</CardTitle>
                <CardDescription>Your platform activity summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {user.role === 'donor' ? '5' : '8'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {user.role === 'donor' ? 'Donations Added' : 'Requests Made'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {user.role === 'donor' ? '3' : '5'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {user.role === 'donor' ? 'Completed Donations' : 'Approved Requests'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">4.8</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {user.role === 'donor' ? '12' : '25'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {user.role === 'donor' ? 'People Helped' : 'Items Received'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>
                  Your latest platform interactions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          {getStatusBadge(activity.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
