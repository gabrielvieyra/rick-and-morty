// Styles
import './styles.scss';

interface CharacterCardProps {
  name: string;
  src: string;
  status: string;
  species: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, src, status, species }) => {
  return (
    <div className='character-card-container'>
      <img src={src} alt={name} />
      <h2>Name: {name}</h2>
      <p>status: {status}</p>
      <p>species: {species}</p>
    </div>
  );
};

export default CharacterCard;
