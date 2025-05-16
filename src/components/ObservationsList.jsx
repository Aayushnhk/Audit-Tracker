
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useObservations } from "../contexts/ObservationContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import {
  PlusIcon,
  FaceFrownIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

// Main functional component for the Observations List
function ObservationsList() {
  // Destructure values from custom hooks
  const { darkMode } = useTheme(); 
  const { observations, updateObservationStatus, deleteObservation } =
    useObservations(); 

  // State variables for managing filters and modal visibility
  const [statusFilter, setStatusFilter] = useState(""); 
  const [severityFilter, setSeverityFilter] = useState(""); 
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [observationToDelete, setObservationToDelete] = useState(null); 
  const navigate = useNavigate(); 

  // Define options for status and severity filters
  const statusOptions = ["", "Open", "In Progress", "Closed"];
  const severityOptions = ["", "High", "Medium", "Low"];

  // Filter and sort observations based on current filter states
  const filteredObservations = observations
    .filter((obs) => !statusFilter || obs.status === statusFilter) 
    .filter((obs) => !severityFilter || obs.severity === severityFilter) 
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 

  // Calculate counts for each status to be used in the chart
  const statusCounts = statusOptions.slice(1).map((status) => ({
    status,
    count: observations.filter((obs) => obs.status === status).length,
  }));

  // Event handler for initiating the delete process
  const handleDeleteClick = (id) => {
    setObservationToDelete(id); 
    setShowDeleteModal(true); 
  };

  // Event handler for confirming the delete action
  const confirmDelete = () => {
    if (observationToDelete) {
      deleteObservation(observationToDelete); 
    }
    setShowDeleteModal(false); 
    setObservationToDelete(null); 
  };

  // Event handler for canceling the delete action
  const cancelDelete = () => {
    setShowDeleteModal(false); 
    setObservationToDelete(null); 
  };

  // Define color schemes for different statuses based on dark/light mode
  const statusColors = {
    light: {
      Open: "#ef4444", 
      "In Progress": "#f59e0b", 
      Closed: "#10b981", 
    },
    dark: {
      Open: "#dc2626", 
      "In Progress": "#d97706", 
      Closed: "#059669", 
    },
  };

  // Tailwind CSS classes for severity badges based on dark/light mode
  const severityColors = {
    light: {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    },
    dark: {
      High: "bg-red-900 text-red-100",
      Medium: "bg-yellow-900 text-yellow-100",
      Low: "bg-green-900 text-green-100",
    },
  };

  // Render the component UI
  return (
    // Main container div with dynamic background based on dark mode
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
      } p-6 transition-colors duration-200`}
    >
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-xl shadow-xl max-w-md w-full p-6`}
          >
            <div className="flex items-start">
              <div
                className={`flex-shrink-0 h-10 w-10 rounded-full ${
                  darkMode ? "bg-red-900" : "bg-red-100"
                } flex items-center justify-center`}
              >
                <ExclamationTriangleIcon
                  className={`h-6 w-6 ${
                    darkMode ? "text-red-300" : "text-red-600"
                  }`}
                />
              </div>
              <div className="ml-4">
                <h3
                  className={`text-lg font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Delete Observation
                </h3>
                <div className="mt-2">
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Are you sure you want to delete this observation? This
                    action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelDelete}
                className={`px-4 py-2 border ${
                  darkMode
                    ? "border-gray-600 text-gray-200 bg-gray-700 hover:bg-gray-600"
                    : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  darkMode ? "focus:ring-gray-500" : "focus:ring-indigo-500"
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Observations Dashboard
            </h1>
            <p
              className={`mt-1 ${darkMode ? "text-gray-300" : "text-gray-500"}`}
            >
              Monitor and manage all security observations
            </p>
          </div>
          {/* Button to navigate to New Observation form */}
          <button
            onClick={() => navigate("/observations/new")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 flex items-center gap-2 shadow-sm"
          >
            <PlusIcon className="h-5 w-5" />
            New Observation
          </button>
        </div>

        {/* Status Distribution Chart Section (conditionally rendered) */}
        {observations.length > 0 && ( 
          <div
            className={`rounded-lg shadow border ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-100"
            } p-6 mb-8`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Status Distribution
              </h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusCounts}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barSize={38}
                >
                  {/* linear gradients for bar colors based on status and theme */}
                  <defs>
                    {statusOptions.slice(1).map((status) => (
                      <linearGradient
                        key={status}
                        id={`color${status.replace(/\s+/g, "")}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={
                            darkMode
                              ? statusColors.dark[status]
                              : statusColors.light[status]
                          }
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={
                            darkMode
                              ? statusColors.dark[status]
                              : statusColors.light[status]
                          }
                          stopOpacity={1}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={darkMode ? "#374151" : "#e5e7eb"}
                  />
                  <XAxis
                    dataKey="status"
                    tick={{
                      fill: darkMode ? "#9ca3af" : "#6b7280",
                      fontSize: 12,
                    }}
                    axisLine={{ stroke: darkMode ? "#4b5563" : "#e5e7eb" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fill: darkMode ? "#9ca3af" : "#6b7280",
                      fontSize: 12,
                    }}
                    axisLine={{ stroke: darkMode ? "#4b5563" : "#e5e7eb" }}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                      border: darkMode
                        ? "1px solid #4b5563"
                        : "1px solid #e5e7eb",
                      borderRadius: "0.375rem",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      fontSize: "0.875rem",
                      padding: "0.5rem 0.75rem",
                      color: darkMode ? "#f3f4f6" : "#111827",
                    }}
                    cursor={{ fill: darkMode ? "#1f2937" : "#f3f4f6" }}
                    formatter={(value) => [`${value} Observations`, ""]}
                  />
                  <Bar
                    dataKey="count"
                    radius={[4, 4, 0, 0]}
                    name="Observations"
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {statusCounts.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#color${entry.status.replace(/\s+/g, "")})`}
                      />
                    ))}
                    <LabelList
                      dataKey="count"
                      position="top"
                      fill={darkMode ? "#d1d5db" : "#4b5563"}
                      fontSize={12}
                      formatter={(value) => value}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Empty State / Observations Table Section */}
        {observations.length === 0 ? ( 
          <div
            className={`rounded-xl shadow-sm p-8 text-center ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <FaceFrownIcon
              className={`mx-auto h-12 w-12 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <h3
              className={`mt-2 text-lg font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              No Observations yet
            </h3>
            <p
              className={`mt-1 ${darkMode ? "text-gray-300" : "text-gray-500"}`}
            >
              Get started by creating your first Observation
            </p>
            <div className="mt-6"></div>
          </div>
        ) : (
          <>
            {/* Filters Section */}
            <div
              className={`rounded-xl shadow-sm p-6 mb-8 border ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-100"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Filter Observations
              </h3>
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                {/* Status Filter Dropdown */}
                <div className="flex-1">
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 cursor-pointer ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option === "" ? "All Statuses" : option}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Severity Filter Dropdown */}
                <div className="flex-1">
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Severity
                  </label>
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 cursor-pointer ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    {severityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option === "" ? "All Severities" : option}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Reset Filters Button */}
                <button
                  onClick={() => {
                    setStatusFilter("");
                    setSeverityFilter("");
                  }}
                  className={`px-4 py-2 font-medium rounded-lg transition duration-200 cursor-pointer ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Observations Table Section */}
            <div
              className={`rounded-xl shadow-sm overflow-hidden border ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-100"
              }`}
            >
              {/* Table Header with count */}
              <div
                className={`px-6 py-4 border-b ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } flex justify-between items-center`}
              >
                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Recent Observations
                </h3>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Showing {filteredObservations.length} of {observations.length}{" "}
                  observations
                </div>
              </div>
              {/* Responsive Table Container */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  {/* Table Head */}
                  <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
                    <tr>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Title
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Severity
                      </th>
                      <th
                        className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Status
                      </th>
                      <th
                        className={`px-14 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Assigned To
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody
                    className={`divide-y ${
                      darkMode ? "divide-gray-700" : "divide-gray-200"
                    }`}
                  >
                    {/* Conditional Rendering for filtered observations or no results message */}
                    {filteredObservations.length > 0 ? (
                      filteredObservations.map((observation) => (
                        <tr
                          key={observation.id}
                          className={
                            darkMode
                              ? "bg-gray-800 hover:bg-gray-700"
                              : "bg-white hover:bg-gray-50"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                                <InformationCircleIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                              </div>
                              <div className="ml-4">
                                <div
                                  className={`text-sm font-medium ${
                                    darkMode ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  {observation.title}
                                </div>
                                <div
                                  className={`text-sm ${
                                    darkMode ? "text-gray-400" : "text-gray-500"
                                  }`}
                                >
                                  ID: {observation.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                darkMode
                                  ? severityColors.dark[observation.severity]
                                  : severityColors.light[observation.severity]
                              }`}
                            >
                              {observation.severity}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={observation.status}
                              onChange={(e) =>
                                updateObservationStatus(
                                  observation.id,
                                  e.target.value
                                )
                              }
                              className={`block w-full pl-3 pr-10 py-1.5 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 cursor-pointer ${
                                observation.status === "Open"
                                  ? darkMode
                                    ? "border-red-700 bg-red-900 text-red-100"
                                    : "border-red-300 bg-red-50 text-red-800"
                                  : observation.status === "In Progress"
                                  ? darkMode
                                    ? "border-yellow-700 bg-yellow-900 text-yellow-100"
                                    : "border-yellow-300 bg-yellow-50 text-yellow-800"
                                  : darkMode
                                  ? "border-green-700 bg-green-900 text-green-100"
                                  : "border-green-300 bg-green-50 text-green-800"
                              }`}
                            >
                              {statusOptions
                                .filter((opt) => opt !== "")
                                .map((option) => (
                                  <option
                                    key={option}
                                    value={option}
                                    className={
                                      darkMode ? "bg-gray-800" : "bg-white"
                                    }
                                  >
                                    {option}
                                  </option>
                                ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-200 dark:bg-indigo-700 flex items-center justify-center text-indigo-800 dark:text-indigo-200 font-medium">
                                {observation.assignedTo
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div className="ml-3">
                                <div
                                  className={`text-sm font-medium ${
                                    darkMode ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  {observation.assignedTo}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              {/* View Details Link */}
                              <Link
                                to={`/observations/${observation.id}`}
                                className={`${
                                  darkMode
                                    ? "text-yellow-400 hover:text-yellow-300"
                                    : "text-yellow-600 hover:text-yellow-800"
                                } transition-colors duration-200`}
                                title="View Details"
                              >
                                <EyeIcon className="h-5 w-5" />
                              </Link>
                              {/* Edit Link */}
                              <Link
                                to={`/observations/${observation.id}/edit`}
                                className={`${
                                  darkMode
                                    ? "text-blue-400 hover:text-blue-300"
                                    : "text-blue-600 hover:text-blue-800"
                                } transition-colors duration-200`}
                                title="Edit Observation"
                              >
                                <PencilIcon className="h-5 w-5" />
                              </Link>
                              {/* Delete Button */}
                              <button
                                onClick={() =>
                                  handleDeleteClick(observation.id)
                                }
                                className={`${
                                  darkMode
                                    ? "text-red-400 hover:text-red-300"
                                    : "text-red-600 hover:text-red-800"
                                } transition-colors duration-200`}
                                title="Delete Observation"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      // Message when no observations match the filters
                      <tr className={darkMode ? "bg-gray-800" : "bg-white"}>
                        <td className="px-6 py-4 text-center" colSpan={5}>
                          <div className="py-8">
                            <FaceFrownIcon
                              className={`mx-auto h-12 w-12 ${
                                darkMode ? "text-gray-500" : "text-gray-400"
                              }`}
                            />
                            <p
                              className={`mt-2 ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              No observations found matching your filters
                            </p>
                            <button
                              onClick={() => {
                                setStatusFilter("");
                                setSeverityFilter("");
                              }}
                              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200"
                            >
                              Reset Filters
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default ObservationsList;