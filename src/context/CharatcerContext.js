// src/context/CharacterContext.js

import React, { createContext, useState } from 'react';

const CharacterContext = createContext();

const CharacterProvider = ({ children }) => {
  const [characterName, setCharacterName] = useState("");

  return (
    <CharacterContext.Provider value={{ characterName, setCharacterName }}>
      {children}
    </CharacterContext.Provider>
  );
};

export { CharacterProvider, CharacterContext };
