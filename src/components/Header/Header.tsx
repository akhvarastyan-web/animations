import React from 'react';
import './Header.scss';

interface HeaderProps {
  current: string;
  onSelect: (name: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ current, onSelect }) => {
  return (
    <header className="header">
      <nav className="header__nav">
        <button
          className={`header__btn ${current === 'card' ? 'header__btn--active-card' : ''}`}
          onClick={() => onSelect('card')}
        >
          Card
        </button>
        <button
          className={`header__btn ${current === 'ball' ? 'header__btn--active-ball' : ''}`}
          onClick={() => onSelect('ball')}
        >
          Ball
        </button>
      </nav>
    </header>
  );
};
