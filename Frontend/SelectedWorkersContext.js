// SelectedWorkersContext.js
import React, { createContext, useState, useContext } from 'react';

const SelectedWorkersContext = createContext();

export const SelectedWorkersProvider = ({ children }) => {
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  return (
    <SelectedWorkersContext.Provider value={{ selectedWorkers, setSelectedWorkers }}>
      {children}
    </SelectedWorkersContext.Provider>
  );
};

export const useSelectedWorkers = () => useContext(SelectedWorkersContext);
