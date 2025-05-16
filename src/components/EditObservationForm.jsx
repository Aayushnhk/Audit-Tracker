import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useObservations } from "../contexts/ObservationContext";
import { useTheme } from "../contexts/ThemeContext";

function EditObservationForm() {
  // Get the observation ID from the URL parameters.
  const { id } = useParams();
  const navigate = useNavigate();
  // Destructure necessary functions and data from the ObservationContext.
  const { observations, updateObservation, assignees, addAssignee } = useObservations();
  const { darkMode } = useTheme();

  // Find the specific observation to edit using the ID.
  const observation = observations.find((obs) => obs.id === id);

  // State variables to hold the form input values.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("High");
  const [assignedTo, setAssignedTo] = useState("");
  const [file, setFile] = useState(null); // For new evidence file upload
  const [currentEvidence, setCurrentEvidence] = useState(null); // To display existing evidence
  const [newAssignee, setNewAssignee] = useState(""); // For adding a new assignee
  const severityOptions = ["High", "Medium", "Low"];

  // Populate form fields with existing observation data when the component mounts or observation changes.
  useEffect(() => {
    if (observation) {
      setTitle(observation.title);
      setDescription(observation.description);
      setSeverity(observation.severity);
      setAssignedTo(observation.assignedTo);
      setCurrentEvidence(observation.evidence);
    }
  }, [observation]); // Depend on 'observation' to re-run when it's loaded or updated

  // Handle adding a new assignee to the list.
  const handleAddAssignee = () => {
    if (newAssignee.trim() && !assignees.includes(newAssignee.trim())) {
      addAssignee(newAssignee.trim()); 
      setAssignedTo(newAssignee.trim()); 
      setNewAssignee(""); 
    } else if (assignees.includes(newAssignee.trim())) {
      alert("Assignee already exists.");
    } else {
      alert("Please enter a name for the new assignee.");
    }
  };

  // Handle the form submission.
  const handleSubmit = (event) => {
    event.preventDefault(); 

    if (!observation) {
      alert("Observation not found!");
      navigate("/observations"); 
      return;
    }

    // Basic validation: ensure an assignee is selected.
    if (!assignedTo) {
      alert("Please select or add an assignee.");
      return;
    }

    let evidenceToSave = currentEvidence; 

    // Function to update the observation data and navigate.
    const processUpdate = () => {
      const updatedObservationData = {
        ...observation, 
        title,
        description,
        severity,
        assignedTo,
        evidence: evidenceToSave, 
        updatedAt: new Date().toISOString(), 
      };
      updateObservation(observation.id, updatedObservationData); 
      navigate(`/observations/${observation.id}`); 
    };

    // If a new file is selected, read it as a Data URL before updating.
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        evidenceToSave = reader.result; 
        processUpdate(); 
      };
      reader.readAsDataURL(file); 
    } else {
      processUpdate();
    }
  };

  // Display a loading message if the observation data is not yet available.
  if (!observation) {
    return (
      <div className={`flex items-center justify-center min-h-screen text-xl font-semibold ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
        Loading observation...
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'} py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Edit Observation</h2>
          <p className={`mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Modify the details of this observation
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`${darkMode ? 'bg-gray-800 shadow-lg border border-gray-700' : 'bg-white shadow-xl border border-gray-100'} rounded-xl px-8 pt-8 pb-8 mb-8`}
        >
          {/* Title Input */}
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
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description Textarea */}
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
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Severity Dropdown */}
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
                onChange={(e) => setSeverity(e.target.value)}
              >
                {severityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Assign To Dropdown and Add New Assignee Input */}
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
                    onChange={(e) => setAssignedTo(e.target.value)}
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

          {/* File Attachment Input */}
          <div className="mb-8">
            <label
              className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}
              htmlFor="file"
            >
              Attach Supporting Evidence
            </label>
            <div className="mt-1 flex items-center">
              <input
                className={`block w-full text-sm ${darkMode ? 'text-gray-400 file:bg-blue-700 file:text-white hover:file:bg-blue-600' : 'text-gray-500 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'} file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold transition duration-200 file:cursor-pointer`}
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            {/* Display message about current evidence if no new file is selected */}
            {currentEvidence && !file && (
              <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Current evidence attached. Upload a new file to replace it.
              </p>
            )}
            {/* Display the name of the newly selected file */}
            {file && (
              <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                New file selected:{" "}
                <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>

          {/* Form Actions (Cancel and Save Buttons) */}
          <div className={`flex items-center justify-end space-x-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <button
              type="button"
              onClick={() => navigate(`/observations/${id}`)}
              className={`px-5 py-2.5 rounded-lg border ${darkMode ? 'border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditObservationForm;