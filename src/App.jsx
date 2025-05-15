import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ObservationProvider } from "./contexts/ObservationContext";
import { ThemeProvider } from "./contexts/ThemeContext"; // Add this import
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import ObservationsList from "./components/ObservationsList";
import CreateObservation from "./components/CreateObservation";
import ObservationDetails from "./components/ObservationDetails";
import EditObservationForm from "./components/EditObservationForm";

function App() {
  return (
    <ThemeProvider> {/* Wrap with ThemeProvider */}
      <ObservationProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/observations" element={<ObservationsList />} />
                <Route path="/observations/new" element={<CreateObservation />} />
                <Route path="/observations/:id" element={<ObservationDetails />} />
                <Route path="/observations/:id/edit" element={<EditObservationForm />} />
                <Route
                  path="*"
                  element={
                    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] text-gray-700 dark:text-gray-300 text-xl font-semibold">
                      404 | Page Not Found
                    </div>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </ObservationProvider>
    </ThemeProvider>
  );
}

export default App;