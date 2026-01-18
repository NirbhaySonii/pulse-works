import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, Package, Upload, MapPin, Calendar, AlertTriangle, Camera, X, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function DonatePage() {
  const [formData, setFormData] = useState({
    itemType: "",
    itemName: "",
    brand: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    condition: "",
    description: "",
    location: "",
    images: [] as File[],
    category: "",
    prescriptionRequired: false,
    tags: [] as string[]
  });

  const [currentTag, setCurrentTag] = useState("");
  const [step, setStep] = useState(1);

  const handleInputChange = (field: string, value: string | boolean | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, ...files].slice(0, 5) // Max 5 images
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Donation data:", formData);
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.itemType && formData.itemName && formData.category;
    }
    if (step === 2) {
      return formData.quantity && formData.unit && formData.expiryDate && formData.condition;
    }
    if (step === 3) {
      return formData.location && formData.images.length > 0;
    }
    return true;
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
            <Link to="/donate" className="text-primary font-medium">Donate</Link>
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Donation</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Share your unused medicines and medical devices with communities in need. 
              Your donation can make a real difference in someone's life.
            </p>
          </div>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Donation Details</span>
                <Badge variant="secondary">Step {step} of 4</Badge>
              </CardTitle>
              <CardDescription>
                {step === 1 && "Tell us about the item you're donating"}
                {step === 2 && "Provide quantity and condition details"}
                {step === 3 && "Add photos and location information"}
                {step === 4 && "Review and confirm your donation"}
              </CardDescription>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Step 1: Item Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="medicine">Medicine</SelectItem>
                            <SelectItem value="medical-device">Medical Device</SelectItem>
                            <SelectItem value="supplement">Health Supplement</SelectItem>
                            <SelectItem value="first-aid">First Aid Supplies</SelectItem>
                            <SelectItem value="mobility">Mobility Equipment</SelectItem>
                            <SelectItem value="diagnostic">Diagnostic Equipment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="itemType">Item Type</Label>
                        <Select value={formData.itemType} onValueChange={(value) => handleInputChange("itemType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select item type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tablet">Tablet</SelectItem>
                            <SelectItem value="capsule">Capsule</SelectItem>
                            <SelectItem value="syrup">Syrup</SelectItem>
                            <SelectItem value="injection">Injection</SelectItem>
                            <SelectItem value="cream">Cream/Ointment</SelectItem>
                            <SelectItem value="drops">Drops</SelectItem>
                            <SelectItem value="inhaler">Inhaler</SelectItem>
                            <SelectItem value="device">Medical Device</SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="itemName">Medicine/Device Name</Label>
                        <Input
                          id="itemName"
                          placeholder="e.g., Paracetamol, Blood Pressure Monitor"
                          value={formData.itemName}
                          onChange={(e) => handleInputChange("itemName", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="brand">Brand/Manufacturer</Label>
                        <Input
                          id="brand"
                          placeholder="e.g., Tylenol, Omron"
                          value={formData.brand}
                          onChange={(e) => handleInputChange("brand", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Any additional details about the item, usage instructions, or special notes..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Quantity & Condition */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          placeholder="e.g., 10"
                          value={formData.quantity}
                          onChange={(e) => handleInputChange("quantity", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tablets">Tablets</SelectItem>
                            <SelectItem value="capsules">Capsules</SelectItem>
                            <SelectItem value="bottles">Bottles</SelectItem>
                            <SelectItem value="boxes">Boxes</SelectItem>
                            <SelectItem value="strips">Strips</SelectItem>
                            <SelectItem value="pieces">Pieces</SelectItem>
                            <SelectItem value="ml">ml</SelectItem>
                            <SelectItem value="mg">mg</SelectItem>
                            <SelectItem value="units">Units</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="expiryDate"
                            type="date"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span>New/Unopened</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="excellent">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span>Excellent - Barely used</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="good">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <span>Good - Some use but functional</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="fair">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                              <span>Fair - Shows wear but works</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Safety Notice */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-amber-800">Safety Guidelines</h4>
                          <ul className="text-sm text-amber-700 mt-1 space-y-1">
                            <li>• Only donate medicines that are at least 6 months before expiry</li>
                            <li>• Ensure original packaging is intact and readable</li>
                            <li>• Never donate prescription medicines without proper verification</li>
                            <li>• Medical devices should be clean and in working condition</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label>Tags (Optional)</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                            <span>{tag}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => removeTag(tag)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add tags like 'pain relief', 'diabetes', etc."
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" variant="outline" onClick={addTag}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Images & Location */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Item Photos</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <div className="text-center">
                          <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Photos</h3>
                          <p className="text-gray-600 mb-4">Add clear photos of the item, packaging, and expiry date</p>
                          <Input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => document.getElementById("image-upload")?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Photos
                          </Button>
                          <p className="text-xs text-gray-500 mt-2">Maximum 5 photos • JPG, PNG up to 10MB each</p>
                        </div>
                      </div>

                      {/* Image Preview */}
                      {formData.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                          {formData.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Pickup Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="location"
                          placeholder="Enter your address or area for pickup coordination"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        This helps NGOs find nearby donations. Your exact address will only be shared after you approve a request.
                      </p>
                    </div>

                    <Button type="button" variant="outline" className="w-full">
                      <MapPin className="h-4 w-4 mr-2" />
                      Use Current Location
                    </Button>
                  </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Donation</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Item Details</h4>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Name:</span> {formData.itemName}</p>
                            <p><span className="font-medium">Brand:</span> {formData.brand}</p>
                            <p><span className="font-medium">Category:</span> {formData.category}</p>
                            <p><span className="font-medium">Type:</span> {formData.itemType}</p>
                            <p><span className="font-medium">Quantity:</span> {formData.quantity} {formData.unit}</p>
                            <p><span className="font-medium">Condition:</span> {formData.condition}</p>
                            <p><span className="font-medium">Expiry:</span> {formData.expiryDate}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Additional Info</h4>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Location:</span> {formData.location}</p>
                            <p><span className="font-medium">Photos:</span> {formData.images.length} uploaded</p>
                            {formData.tags.length > 0 && (
                              <div>
                                <span className="font-medium">Tags:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {formData.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {formData.description && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                          <p className="text-sm text-gray-600">{formData.description}</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Heart className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-800">What happens next?</h4>
                          <ul className="text-sm text-green-700 mt-1 space-y-1">
                            <li>• Your donation will be listed on the platform</li>
                            <li>• NGOs in your area can request the item</li>
                            <li>• You'll be notified when someone is interested</li>
                            <li>• Coordinate pickup with the requesting organization</li>
                            <li>• Track the impact of your donation</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full py-6 text-lg font-semibold">
                      <Package className="h-5 w-5 mr-2" />
                      List My Donation
                    </Button>
                  </div>
                )}

                {/* Navigation Buttons */}
                {step < 4 && (
                  <div className="flex justify-between pt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setStep(step - 1)}
                      disabled={step === 1}
                    >
                      Previous
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => setStep(step + 1)}
                      disabled={!isStepValid()}
                    >
                      Next Step
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
