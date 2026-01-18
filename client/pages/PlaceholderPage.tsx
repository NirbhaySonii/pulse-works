import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Construction } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  features?: string[];
}

export default function PlaceholderPage({ title, description, features = [] }: PlaceholderPageProps) {
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Construction className="h-12 w-12 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
          <p className="text-xl text-gray-600 mb-8">{description}</p>
          
          {features.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
                <CardDescription>This page will include the following features:</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">Back to Homepage</Link>
            </Button>
            <Button variant="outline">
              Request Feature Priority
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
