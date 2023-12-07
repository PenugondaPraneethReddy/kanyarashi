import React, { createContext, useState, useContext, useEffect } from 'react';

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  // Retrieve the initial city from localStorage or default to an empty string
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || '');

  // Update localStorage when selectedCity changes
  useEffect(() => {
    localStorage.setItem('selectedCity', selectedCity);
  }, [selectedCity]);

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);



