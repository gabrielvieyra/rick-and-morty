// Dependencies
import { useContext } from 'react';

// Components
import CharacterCard from '../CharacterCard';

// Context
import { CharactersContext } from '../../context/CharactersContext';

// Styles
import './styles.scss';

const CharacterCardsContainer: React.FC = () => {
  const { characters } = useContext(CharactersContext);
  // console.log(characters);

  return (
    <div className='characters-cards-container'>
      {characters.map((character, index) => {
        const { name, image, id, species, status } = character;
        return (
          <CharacterCard
            key={id ? id : index}
            name={name}
            src={image}
            species={species}
            status={status}
          />
        );
      })}
    </div>
  );
};

export default CharacterCardsContainer;
