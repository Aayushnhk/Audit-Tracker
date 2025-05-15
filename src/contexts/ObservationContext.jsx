import { createContext, useContext, useState, useEffect } from "react";
const ObservationContext = createContext();

export function ObservationProvider({ children }) {
  // State for storing the list of observations.
  const [observations, setObservations] = useState(() => {
    const saved = localStorage.getItem("audit-observations");
    return saved ? JSON.parse(saved) : [];
  });

  // State for storing the list of assignees.
  const [assignees, setAssignees] = useState(() => {
    const savedAssignees = localStorage.getItem("audit-assignees");
    return savedAssignees ? JSON.parse(savedAssignees) : [];
  });

  // Effect hook to persist observations to local storage
  useEffect(() => {
    localStorage.setItem("audit-observations", JSON.stringify(observations));
  }, [observations]); // Dependency array: runs when `observations` changes

  // Effect hook to persist assignees to local storage
  useEffect(() => {
    localStorage.setItem("audit-assignees", JSON.stringify(assignees));
  }, [assignees]); // Dependency array: runs when `assignees` changes

  // Function to add a new observation.
  const addObservation = (newObservationData) => {
    setObservations((prevObservations) => [
      {
        ...newObservationData,
        id: Date.now().toString(),
        createdAt: Date.now(),
        status: "Open",
      },
      ...prevObservations,
    ]);
  };

  // Function to update the status of an existing observation.
  const updateObservationStatus = (id, newStatus) => {
    setObservations((prevObservations) =>
      prevObservations.map((obs) =>
        obs.id === id.toString() ? { ...obs, status: newStatus } : obs
      )
    );
  };

  // Function to update an existing observation with new data.
  const updateObservation = (id, updatedData) => {
    setObservations((prevObservations) =>
      prevObservations.map((obs) =>
        obs.id === id.toString() ? { ...obs, ...updatedData } : obs
      )
    );
  };

  // Function to delete an observation by its ID.
  const deleteObservation = (idToDelete) => {
    setObservations((prevObservations) =>
      prevObservations.filter((obs) => obs.id !== idToDelete.toString())
    );
  };

  // Function to add a new assignee.
  const addAssignee = (newAssigneeName) => {
    if (newAssigneeName.trim() && !assignees.includes(newAssigneeName.trim())) {
      setAssignees((prevAssignees) => [
        ...prevAssignees,
        newAssigneeName.trim(),
      ]);
      return true;
    }
    return false;
  };

  // The value object that will be provided by the Context.
  const value = {
    observations,
    addObservation,
    updateObservationStatus,
    updateObservation,
    deleteObservation,
    assignees,
    addAssignee,
  };

  return (
    // The Context.Provider makes the `value` available to any descendant component
    <ObservationContext.Provider value={value}>
      {children}
    </ObservationContext.Provider>
  );
}

// Custom hook to easily consume the ObservationContext
export function useObservations() {
  const context = useContext(ObservationContext);
  if (!context) {
    throw new Error(
      "useObservations must be used within an ObservationProvider"
    );
  }
  return context;
}
