import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import LoginPage from './pages/login';
import ContentGenerationDashboard from './pages/content-generation-dashboard';
import ContentHistory from './pages/content-history';
import ProfileSettings from './pages/profile-settings';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ContentGenerationDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/content-generation-dashboard" element={<ContentGenerationDashboard />} />
        <Route path="/content-history" element={<ContentHistory />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
