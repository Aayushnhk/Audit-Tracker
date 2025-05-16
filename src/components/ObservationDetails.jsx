import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useObservations } from "../contexts/ObservationContext";
import { useTheme } from "../contexts/ThemeContext"; 

function ObservationDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { observations } = useObservations();
  const { darkMode } = useTheme(); 

  const observation = observations.find((obs) => obs.id === id);

  // If the observation is not found, display a "not found" message and a back button
  if (!observation) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'} transition-colors duration-200`}>
        <div className={`p-8 rounded-xl shadow-lg text-center max-w-md w-full ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'}`}>
          <p className="text-xl font-semibold mb-4">
            Observation not found.
          </p>
          <button
            onClick={() => navigate("/observations")}
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to Observations
          </button>
        </div>
      </div>
    );
  }

  // Determine severity badge colors based on dark mode
  const getSeverityBadgeClasses = (severity) => {
    if (darkMode) {
      switch (severity) {
        case "High":
          return "bg-red-700 text-red-100";
        case "Medium":
          return "bg-yellow-700 text-yellow-100";
        case "Low":
          return "bg-green-700 text-green-100";
        default:
          return "bg-gray-700 text-gray-100";
      }
    } else {
      switch (severity) {
        case "High":
          return "bg-red-100 text-red-800";
        case "Medium":
          return "bg-yellow-100 text-yellow-800";
        case "Low":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  // Determine status badge colors based on dark mode
  const getStatusBadgeClasses = (status) => {
    if (darkMode) {
      switch (status) {
        case "Open":
          return "bg-red-700 text-red-100";
        case "In Progress":
          return "bg-yellow-700 text-yellow-100";
        case "Closed":
          return "bg-green-700 text-green-100";
        default:
          return "bg-gray-700 text-gray-100";
      }
    } else {
      switch (status) {
        case "Open":
          return "bg-red-100 text-red-800";
        case "In Progress":
          return "bg-yellow-100 text-yellow-800";
        case "Closed":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'} py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Observation Details
          </h2>
          <p className={`mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>View observation details</p>
        </div>

        <div className={`${darkMode ? 'bg-gray-800 shadow-lg border border-gray-700' : 'bg-white shadow-xl border border-gray-100'} rounded-xl overflow-hidden`}>
          {/* Header section of the details card */}
          <div className={`px-6 py-5 border-b ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {observation.title}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID: {observation.id}</p>
          </div>

          {/* Main body of the details card */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Description</p>
                <p className={`mt-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  {observation.description || "N/A"}
                </p>
              </div>
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Severity</p>
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityBadgeClasses(observation.severity)}`}>
                  {observation.severity}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Assigned To</p>
                <p className={`mt-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{observation.assignedTo}</p>
              </div>
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Created At</p>
                <p className={`mt-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  {new Date(observation.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Current Status
              </p>
              <div className="mt-2">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClasses(observation.status)}`}>
                  {observation.status}
                </span>
              </div>
            </div>

            {observation.evidence && (
              <div className="mb-6">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Evidence</p>
                {observation.evidence.startsWith("data:image") ? (
                  <img
                    src={observation.evidence}
                    alt="Observation Evidence"
                    className="mt-2 max-w-full h-auto rounded-lg shadow-md"
                  />
                ) : (
                  <a
                    href={observation.evidence}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-blue-600 hover:underline flex items-center"
                  >
                    View Attached File
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Footer section with navigation buttons */}
          <div className={`px-6 py-4 flex justify-end space-x-3 ${darkMode ? 'bg-gray-700 border-t border-gray-600' : 'bg-gray-50 border-t border-gray-200'}`}>
            <button
              onClick={() => navigate("/observations")}
              className={`px-5 py-2.5 rounded-lg border ${darkMode ? 'border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200`}
            >
              Back to Observations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ObservationDetails;