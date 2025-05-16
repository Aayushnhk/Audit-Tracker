import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext"; 
import { useObservations } from "../contexts/ObservationContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import {
  ChartBarIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  EyeIcon,
  InformationCircleIcon,
  PlusIcon, 
  FaceFrownIcon, 
} from "@heroicons/react/24/outline";

function HomePage() {
  const { observations } = useObservations();
  const { darkMode } = useTheme(); 

  const statusOptions = ["Open", "In Progress", "Closed"];
  const statusCounts = statusOptions.map((status) => ({
    status,
    count: observations.filter((obs) => obs.status === status).length,
  }));

  const chartStatusColors = {
    light: {
      Open: "#ef4444", // red-500
      "In Progress": "#f59e0b", // amber-500
      Closed: "#10b981", // emerald-500
    },
    dark: {
      Open: "#dc2626", // darker red
      "In Progress": "#d97706", // darker amber
      Closed: "#059669", // darker emerald
    },
  };

  
  const statsColors = {
    light: {
      "Total Observations": {
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        iconBg: "bg-indigo-600",
      },
      Open: { color: "text-red-600", bg: "bg-red-50", iconBg: "bg-red-600" },
      "In Progress": {
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        iconBg: "bg-yellow-600",
      },
      Closed: {
        color: "text-green-600",
        bg: "bg-green-50",
        iconBg: "bg-green-600",
      },
    },
    dark: {
      "Total Observations": {
        color: "text-indigo-400",
        bg: "bg-gray-800",
        iconBg: "bg-indigo-700",
      },
      Open: { color: "text-red-600", bg: "bg-gray-800", iconBg: "bg-red-700" },
      "In Progress": {
        color: "text-yellow-600",
        bg: "bg-gray-800",
        iconBg: "bg-yellow-700",
      },
      Closed: {
        color: "text-green-600",
        bg: "bg-gray-800",
        iconBg: "bg-green-700",
      },
    },
  };

  const stats = [
    {
      name: "Total Observations",
      value: observations.length,
    },
    {
      name: "Open",
      value: observations.filter((o) => o.status === "Open").length,
    },
    {
      name: "In Progress",
      value: observations.filter((o) => o.status === "In Progress").length,
    },
    {
      name: "Closed",
      value: observations.filter((o) => o.status === "Closed").length,
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
      } p-6 transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            } mb-1`}
          >
            Audit Tracker
          </h1>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Observation & Action Flow Dashboard
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className={`${
                darkMode
                  ? statsColors.dark[stat.name].bg
                  : statsColors.light[stat.name].bg
              } p-6 rounded-xl shadow-sm border ${
                darkMode ? "border-gray-700" : "border-gray-100"
              } hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`text-base font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.name}
                </h3>
                <div
                  className={`${
                    darkMode
                      ? statsColors.dark[stat.name].iconBg
                      : statsColors.light[stat.name].iconBg
                  } p-2 rounded-lg`}
                >
                  {
                    {
                      "Total Observations": (
                        <ChartBarIcon className="w-5 h-5 text-white" />
                      ),
                      Open: (
                        <ExclamationCircleIcon className="w-5 h-5 text-white" />
                      ),
                      "In Progress": (
                        <ArrowPathIcon className="w-5 h-5 text-white animate-spin" />
                      ),
                      Closed: (
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      ),
                    }[stat.name]
                  }
                </div>
              </div>
              <p
                className={`${
                  darkMode
                    ? statsColors.dark[stat.name].color
                    : statsColors.light[stat.name].color
                } text-4xl font-bold mt-4 mb-2`}
              >
                {stat.value}
              </p>
              {stat.name !== "Total Observations" && (
                <div className="relative pt-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {Math.round(
                        (stat.value / Math.max(1, observations.length)) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        darkMode
                          ? statsColors.dark[stat.name].iconBg
                          : statsColors.light[stat.name].iconBg
                      }`}
                      style={{
                        width: `${Math.round(
                          (stat.value / Math.max(1, observations.length)) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Status Distribution Chart */}
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
            {observations.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusCounts}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barSize={38}
                >
                  <defs>
                    {statusOptions.map((status) => (
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
                              ? chartStatusColors.dark[status]
                              : chartStatusColors.light[status]
                          }
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={
                            darkMode
                              ? chartStatusColors.dark[status]
                              : chartStatusColors.light[status]
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
            ) : (
              // Empty State (copied from ObservationsList for consistency)
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
                  className={`mt-1 ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Get started by creating your first Observation
                </p>
                <div className="mt-6"></div>
              </div>
            )}
          </div>
        </div>

        {/* Link to all observations */}
        <div className="mt-8 text-center">
          <Link
            to="/observations"
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm ${
              darkMode
                ? "text-white bg-indigo-700 hover:bg-indigo-600"
                : "text-white bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              darkMode
                ? "focus:ring-offset-gray-900 focus:ring-indigo-500"
                : "focus:ring-indigo-500"
            }`}
          >
            <EyeIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            View All Observations
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
