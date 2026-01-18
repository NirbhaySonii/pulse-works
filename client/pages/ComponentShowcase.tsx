import { Heart, Palette, Layout, Type, MousePointer, Layers, Grid, Box, Circle, Square, Triangle, Star, Settings, Eye, Download, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ComponentShowcase() {
  const colorPalette = [
    { name: "Primary", value: "#10b981", usage: "Main brand color, CTAs, links" },
    { name: "Secondary", value: "#3b82f6", usage: "NGO role, secondary actions" },
    { name: "Accent", value: "#8b5cf6", usage: "Volunteers, special highlights" },
    { name: "Success", value: "#22c55e", usage: "Success states, confirmations" },
    { name: "Warning", value: "#f59e0b", usage: "Warnings, pending states" },
    { name: "Error", value: "#ef4444", usage: "Errors, destructive actions" },
    { name: "Gray 50", value: "#f9fafb", usage: "Background, subtle areas" },
    { name: "Gray 900", value: "#111827", usage: "Text, headings" }
  ];

  const components = [
    {
      category: "Navigation",
      items: [
        { name: "Header", description: "Main navigation with logo and auth" },
        { name: "Breadcrumbs", description: "Page hierarchy navigation" },
        { name: "Sidebar", description: "Dashboard navigation menu" },
        { name: "Footer", description: "Site footer with links" }
      ]
    },
    {
      category: "Forms",
      items: [
        { name: "Input", description: "Text input fields with validation" },
        { name: "Select", description: "Dropdown selection components" },
        { name: "Button", description: "Primary, secondary, outline variants" },
        { name: "Checkbox", description: "Selection controls" },
        { name: "Radio", description: "Single selection controls" },
        { name: "Textarea", description: "Multi-line text input" }
      ]
    },
    {
      category: "Data Display",
      items: [
        { name: "Card", description: "Content containers with shadows" },
        { name: "Badge", description: "Status indicators and labels" },
        { name: "Avatar", description: "User profile images" },
        { name: "Alert", description: "Important messages and notifications" },
        { name: "Table", description: "Data tables with sorting" },
        { name: "Stats Cards", description: "Metric display cards" }
      ]
    },
    {
      category: "Layout",
      items: [
        { name: "Container", description: "Max-width content containers" },
        { name: "Grid", description: "Responsive grid layouts" },
        { name: "Flex", description: "Flexible box layouts" },
        { name: "Divider", description: "Section separators" },
        { name: "Spacer", description: "Consistent spacing utilities" }
      ]
    },
    {
      category: "Interactive",
      items: [
        { name: "Modal", description: "Overlay dialogs and confirmations" },
        { name: "Dropdown", description: "Menu and action dropdowns" },
        { name: "Tooltip", description: "Contextual help and info" },
        { name: "Toast", description: "Temporary notifications" },
        { name: "Tabs", description: "Content organization tabs" },
        { name: "Accordion", description: "Collapsible content sections" }
      ]
    },
    {
      category: "Specialized",
      items: [
        { name: "QR Code", description: "Donation tracking QR codes" },
        { name: "Map", description: "Interactive location maps" },
        { name: "Image Upload", description: "Drag & drop image uploaders" },
        { name: "Progress", description: "Step indicators and progress bars" },
        { name: "Calendar", description: "Date selection components" },
        { name: "Rating", description: "Star rating components" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Figma-style Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary fill-primary" />
              <span className="text-xl font-bold text-gray-900">MedMate Design System</span>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              v1.0.0
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Figma-style Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <Layers className="h-4 w-4 mr-2" />
                  Design System
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="px-3 py-2 rounded-md bg-blue-50 text-blue-700 cursor-pointer">Components</div>
                  <div className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 cursor-pointer">Colors</div>
                  <div className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 cursor-pointer">Typography</div>
                  <div className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 cursor-pointer">Icons</div>
                  <div className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 cursor-pointer">Spacing</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <Layout className="h-4 w-4 mr-2" />
                  Pages
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 cursor-pointer">Home</div>
                  <div className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 cursor-pointer">Dashboard</div>
                  <div className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 cursor-pointer">Donations</div>
                  <div className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 cursor-pointer">Profile</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Tools
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 cursor-pointer">Inspector</div>
                  <div className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 cursor-pointer">Assets</div>
                  <div className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 cursor-pointer">Plugins</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">MedMate Component Library</h1>
                  <p className="text-gray-600">Complete UI component system for medical donation platform</p>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  50+ Components
                </Badge>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Components</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">8</div>
                  <div className="text-sm text-gray-600">Color Tokens</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">16</div>
                  <div className="text-sm text-gray-600">Page Templates</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Responsive</div>
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Palette className="h-6 w-6 mr-3" />
                Color System
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {colorPalette.map((color, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div 
                      className="w-full h-16 rounded-lg mb-3 border border-gray-200"
                      style={{ backgroundColor: color.value }}
                    ></div>
                    <div className="font-medium text-gray-900">{color.name}</div>
                    <div className="text-sm text-gray-600 font-mono mb-2">{color.value}</div>
                    <div className="text-xs text-gray-500">{color.usage}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Component Categories */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Box className="h-6 w-6 mr-3" />
                Component Library
              </h2>
              
              {components.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.category}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {category.items.map((component, componentIndex) => (
                      <div key={componentIndex} className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between mb-3">
                          <div className="font-medium text-gray-900">{component.name}</div>
                          <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                            {componentIndex % 4 === 0 && <Square className="h-4 w-4 text-gray-600" />}
                            {componentIndex % 4 === 1 && <Circle className="h-4 w-4 text-gray-600" />}
                            {componentIndex % 4 === 2 && <Triangle className="h-4 w-4 text-gray-600" />}
                            {componentIndex % 4 === 3 && <Star className="h-4 w-4 text-gray-600" />}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">{component.description}</div>
                        
                        {/* Mini Component Preview */}
                        <div className="mt-3 p-2 bg-gray-50 rounded border border-gray-100">
                          {component.name === "Button" && (
                            <div className="space-y-2">
                              <Button size="sm" className="w-full">Primary</Button>
                              <Button size="sm" variant="outline" className="w-full">Outline</Button>
                            </div>
                          )}
                          {component.name === "Input" && (
                            <Input placeholder="Sample input" className="w-full" />
                          )}
                          {component.name === "Badge" && (
                            <div className="flex space-x-1">
                              <Badge variant="default">Primary</Badge>
                              <Badge variant="secondary">Secondary</Badge>
                            </div>
                          )}
                          {component.name === "Card" && (
                            <div className="bg-white p-2 rounded border border-gray-200">
                              <div className="h-2 bg-gray-200 rounded mb-1"></div>
                              <div className="h-1 bg-gray-100 rounded"></div>
                            </div>
                          )}
                          {component.name === "Alert" && (
                            <Alert className="p-2">
                              <AlertDescription className="text-xs">Sample alert message</AlertDescription>
                            </Alert>
                          )}
                          {!["Button", "Input", "Badge", "Card", "Alert"].includes(component.name) && (
                            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Figma Integration CTA */}
            <section className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 border border-purple-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Box className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Convert to Figma Design</h3>
                <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                  Use the Builder.io Figma plugin to convert these components into proper Figma designs and prototypes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8 py-6 text-lg">
                    Get Figma Plugin
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                    View in Builder.io
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Plugin available at: <span className="font-mono">https://www.figma.com/community/plugin/747985167520967365</span>
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
