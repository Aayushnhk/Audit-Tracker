import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useObservations } from "../contexts/ObservationContext";
import { useTheme } from "../contexts/ThemeContext"; // Import useTheme

function CreateObservation() {
  const { addObservation, assignees, addAssignee } = useObservations();
  const { darkMode } = useTheme(); // Get darkMode from context

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("High");
  const [assignedTo, setAssignedTo] = useState("");
  const [file, setFile] = useState(null);
  const [newAssignee, setNewAssignee] = useState("");

  const navigate = useNavigate();

  const severityOptions = ["High", "Medium", "Low"];

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleSeverityChange = (event) => setSeverity(event.target.value);
  const handleAssignedToChange = (event) => setAssignedTo(event.target.value);
  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleAddAssignee = () => {
    if (newAssignee.trim() && !assignees.includes(newAssignee.trim())) {
      addAssignee(newAssignee.trim());
      setAssignedTo(newAssignee.trim());
      setNewAssignee("");
    } else {
      alert("Assignee already exists or input is empty.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!assignedTo) {
      alert("Please add and select an assignee.");
      return;
    }

    let evidenceBase64 = null;

    const processObservation = () => {
      const newObservationData = {
        title,
        description,
        severity,
        assignedTo,
        evidence: evidenceBase64,
      };

      addObservation(newObservationData);
      navigate("/observations");
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        evidenceBase64 = reader.result;
        processObservation();
      };
      reader.readAsDataURL(file);
    } else {
      processObservation();
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'} py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Create New Observation
          </h2>
          <p className={`mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Fill out the form to document a new observation
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`${darkMode ? 'bg-gray-800 shadow-lg border border-gray-700' : 'bg-white shadow-xl border border-gray-100'} rounded-xl px-8 pt-8 pb-8 mb-8`}
        >
          <div className="mb-6">
            <label
              className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}
              htmlFor="title"
            >
              Title
            </label>
            <input
              className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
              id="title"
              type="text"
              placeholder="Observation Title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 h-40`}
              id="description"
              placeholder="Detailed Description"
              value={description}
              onChange={handleDescriptionChange}
              rows="3"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}
                htmlFor="severity"
              >
                Severity
              </label>
              <select
                className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 cursor-pointer`}
                id="severity"
                value={severity}
                onChange={handleSeverityChange}
              >
                {severityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}
                htmlFor="assignedTo"
              >
                Assign To
              </label>
              <div className="space-y-2">
                {assignees.length > 0 ? (
                  <select
                    className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 cursor-pointer`}
                    id="assignedTo"
                    value={assignedTo}
                    onChange={handleAssignedToChange}
                    required
                  >
                    <option value="">Select Assignee</option>
                    {assignees.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className={`text-sm py-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No assignees available. Please add one below.
                  </div>
                )}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    placeholder="Enter new assignee name"
                    className={`flex-1 px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                  <button
                    type="button"
                    onClick={handleAddAssignee}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Add Assignee
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label
              className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}
              htmlFor="file"
            >
              Attach File
            </label>
            <div className="mt-1 flex items-center">
              <input
                className={`block w-full text-sm ${darkMode ? 'text-gray-400 file:bg-blue-700 file:text-white hover:file:bg-blue-600' : 'text-gray-500 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'} file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold transition duration-200 file:cursor-pointer`}
                id="file"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-4 border-t-2 ${darkMode ? 'border-gray-700' : 'border-gray-100'}">
            <button
              type="button"
              onClick={() => navigate("/observations")}
              className={`px-5 py-2.5 rounded-lg border ${darkMode ? 'border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              Create Observation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateObservation;