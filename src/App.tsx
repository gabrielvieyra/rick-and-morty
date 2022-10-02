// Components
import Header from './components/Header';
import CharacterCardsContainer from './components/CharacterCardsContainer';
import Pagination from './components/Pagination';

// Provider
import { CharactersProvider } from './context/CharactersContext';

// Styles
import './App.scss';

function App() {
  return (
    <>
      <Header />
      <CharactersProvider>
        <Pagination />
        <CharacterCardsContainer />
      </CharactersProvider>
    </>
  );
}

export default App;
