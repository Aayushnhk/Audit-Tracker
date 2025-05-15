import React from "react";
import { Link } from "react-router-dom";
import { 
  ClipboardDocumentCheckIcon, 
  DocumentTextIcon,
  MoonIcon,
  SunIcon 
} from "@heroicons/react/24/outline";
import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <ClipboardDocumentCheckIcon className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
              <span>Audit Tracker</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/observations"
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 flex items-center gap-1"
            >
              <DocumentTextIcon className="h-5 w-5" />
              Observations
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;