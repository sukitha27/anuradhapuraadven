import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MaintenanceContextType {
  isMaintenanceMode: boolean;
  enableMaintenanceMode: () => void;
  disableMaintenanceMode: () => void;
  toggleMaintenanceMode: () => void;
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

export const useMaintenanceMode = () => {
  const context = useContext(MaintenanceContext);
  if (!context) {
    throw new Error('useMaintenanceMode must be used within a MaintenanceProvider');
  }
  return context;
};

interface MaintenanceProviderProps {
  children: ReactNode;
}

export const MaintenanceProvider = ({ children }: MaintenanceProviderProps) => {
  // Set to false by default - change to true to enable maintenance mode
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(true);

  const enableMaintenanceMode = () => setIsMaintenanceMode(true);
  const disableMaintenanceMode = () => setIsMaintenanceMode(false);
  const toggleMaintenanceMode = () => setIsMaintenanceMode(prev => !prev);

  return (
    <MaintenanceContext.Provider
      value={{
        isMaintenanceMode,
        enableMaintenanceMode,
        disableMaintenanceMode,
        toggleMaintenanceMode,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
};