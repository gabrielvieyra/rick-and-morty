// Dependencies
import { createContext, useState, useEffect } from 'react';

// Interface
import { Character } from '../types/types';

interface CharactersContextProps {
  characters: Array<Character>;
}

export const CharactersContext = createContext({} as CharactersContextProps);

interface CharactersProviderProps {
  children: React.ReactNode;
}

export const CharactersProvider: React.FC<CharactersProviderProps> = ({ children }) => {
  const [characters, setCharacters] = useState<Array<Character>>([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData(): Promise<void> {
    try {
      const getResponse = await fetch('https://rickandmortyapi.com/api/character');
      const getJson = await getResponse.json();
      setCharacters(getJson.results);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CharactersContext.Provider value={{ characters }}>
      {children}
    </CharactersContext.Provider>
  );
};
