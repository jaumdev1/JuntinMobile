// CardDataContext.tsx
import React from 'react';
import { Juntin } from '../interfaces/Juntin/Juntin';

interface CardDataContextProps {
  juntinData: Juntin;
  setJuntinData: React.Dispatch<React.SetStateAction<Juntin>>;
}

export const CardDataContext = React.createContext<CardDataContextProps | undefined>(undefined);

interface CardDataProviderProps {
  children: React.ReactNode;
}

export const CardDataProvider: React.FC<CardDataProviderProps> = ({ children }) => {
  const [juntinData, setJuntinData] = React.useState<Juntin>({}as Juntin);

  return (
    <CardDataContext.Provider value={{ juntinData, setJuntinData }}>
      {children}
    </CardDataContext.Provider>
  );
};