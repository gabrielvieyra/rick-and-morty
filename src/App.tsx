// Components
import Header from './components/Header';
import CharacterCardsContainer from './components/CharacterCardsContainer';

// Provider
import { CharactersProvider } from './context/CharactersContext';

// Styles
import './App.scss';

function App() {
  return (
    <>
      <Header />
      <CharactersProvider>
        <CharacterCardsContainer />
      </CharactersProvider>
    </>
  );
}

export default App;
