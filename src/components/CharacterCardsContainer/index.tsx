import { useContext } from 'react';

// Components
import CharacterCard from '../CharacterCard';

// Context
import { CharactersContext } from '../../context/CharactersContext';

// Styles
import './styles.scss';

const CharacterCardsContainer: React.FC = () => {
  const { characters } = useContext(CharactersContext);

  return (
    <div className='characters-cards-container'>
      {characters.map((character, index) => {
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
  );
};

export default CharacterCardsContainer;
