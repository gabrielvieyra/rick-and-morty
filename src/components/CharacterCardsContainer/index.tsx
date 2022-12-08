import { useContext } from 'react';

// Components
import CharacterCard from '../CharacterCard';
import Spinner from '../Spinner';
import Error from '../Error';

// Context
import { CharactersContext } from '../../context/CharactersContext';

// Styles
import './styles.scss';

const CharacterCardsContainer: React.FC = () => {
  const { characters, loading, error } = useContext(CharactersContext);

  return (
    <>
      {loading ? (
        <div className='characters-cards-container-loading'>
          <Spinner />
        </div>
      ) : error ? (
        <Error />
      ) : (
        <div className='characters-cards-container'>
          {characters &&
            characters.map((character, index) => {
              const { name, image, id, species, status, location, episode } = character;
              return (
                <CharacterCard
                  key={id ? id : index}
                  name={name}
                  src={image}
                  species={species}
                  status={status}
                  lastKnownLocation={location.name}
                  totalEpisodes={episode.length}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default CharacterCardsContainer;
