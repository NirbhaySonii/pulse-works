import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, Package, Upload, ArrowLeft, Camera, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface DonationFormData {
  name: string;
  category: string;
  quantity: string;
  expiryDate: string;
  description: string;
  image: File | null;
}

export default function AddDonation() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<DonationFormData>({
    name: "",
    category: "",
    quantity: "",
    expiryDate: "",
    description: "",
    image: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Redirect if not a donor
  if (!user || user.role !== 'donor') {
    navigate('/dashboard');
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!formData.name || !formData.category || !formData.quantity || !formData.expiryDate) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    const expiryDate = new Date(formData.expiryDate);
    const today = new Date();
    if (expiryDate <= today) {
      setError("Expiry date must be in the future");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock successful submission
    console.log("Donation added:", formData);
    
    setIsLoading(false);
    navigate('/dashboard', { 
      state: { message: 'Donation added successfully!' }
    });
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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Donation</h1>
          <p className="text-gray-600 mt-2">Share your unused medicines and medical equipment with those in need.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Donation Details</span>
            </CardTitle>
            <CardDescription>
              Provide accurate information about the item you want to donate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Paracetamol 500mg, Blood Pressure Monitor"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              {/* Category and Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="equipment">Medical Equipment</SelectItem>
                      <SelectItem value="supplies">Medical Supplies</SelectItem>
                      <SelectItem value="devices">Medical Devices</SelectItem>
                      <SelectItem value="supplements">Health Supplements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    placeholder="e.g., 24, 1, 50"
                    value={formData.quantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  required
                />
                <p className="text-sm text-gray-500">
                  Only items with at least 6 months before expiry are recommended
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Additional details about the item, usage instructions, or condition..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Item Photo (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {imagePreview ? (
                    <div className="text-center">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-w-full h-48 object-cover rounded-lg mx-auto mb-4"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, image: null }));
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Item Photo</h3>
                      <p className="text-gray-600 mb-4">Clear photos help NGOs identify the item</p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => document.getElementById("image-upload")?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Photo
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Safety Guidelines */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Safety Guidelines</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Only donate items in original, unopened packaging</li>
                  <li>• Ensure expiry date is clearly visible and valid</li>
                  <li>• Never donate prescription medicines without verification</li>
                  <li>• Medical devices should be clean and functional</li>
                </ul>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Adding Donation..." : "Add Donation"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/dashboard">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
