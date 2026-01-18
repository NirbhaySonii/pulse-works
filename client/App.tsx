import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import AddDonation from "./pages/AddDonation";
import MyDonations from "./pages/MyDonations";
import BrowseDonations from "./pages/BrowseDonations";
import Profile from "./pages/Profile";
import Requests from "./pages/Requests";
import MyRequests from "./pages/MyRequests";

// Legacy pages (keeping for reference)
import DonatePage from "./pages/DonatePage";
import FindDonationsPage from "./pages/FindDonationsPage";
import VolunteerPage from "./pages/VolunteerPage";
import ImpactPage from "./pages/ImpactPage";
import AdminDashboard from "./pages/AdminDashboard";
import QRTrackerPage from "./pages/QRTrackerPage";
import ThankYouPage from "./pages/ThankYouPage";
import DesignShowcase from "./pages/DesignShowcase";
import ComponentShowcase from "./pages/ComponentShowcase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Main App Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />

            {/* Donor Routes */}
            <Route path="/add-donation" element={<AddDonation />} />
            <Route path="/my-donations" element={<MyDonations />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/requests/:donationId" element={<Requests />} />

            {/* NGO Routes */}
            <Route path="/browse-donations" element={<BrowseDonations />} />
            <Route path="/my-requests" element={<MyRequests />} />

            {/* Legacy Routes (keeping for reference) */}
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/find-donations" element={<FindDonationsPage />} />
            <Route path="/volunteer" element={<VolunteerPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/qr-tracker" element={<QRTrackerPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/design-showcase" element={<DesignShowcase />} />
            <Route path="/components" element={<ComponentShowcase />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
