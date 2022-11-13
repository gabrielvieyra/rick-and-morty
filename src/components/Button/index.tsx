import { FC, ReactNode } from 'react';

// Styles
import './styles.scss';

interface ButtonProps {
  children: ReactNode;
  ariaLabel: string;
  dataType: 'next' | 'prev';
  isDisabled: boolean;
  handlePage: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({ children, ariaLabel, dataType, isDisabled, handlePage }) => {
  return (
    <button
      className='button'
      aria-label={ariaLabel}
      data-type={dataType}
      onClick={handlePage}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
