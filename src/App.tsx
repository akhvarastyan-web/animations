import './App.scss';
import React, { useState } from 'react';
import { Header } from './components/Header/Header';
//import { CardAnimation } from './components/ScrollAnimation';
import { BallAnimation } from './components/Ball/BallAnimation';

export const App: React.FC = () => {
  const [activeAnimation, setActiveAnimation] = useState<string>('scroll');

  return (
    <div className="app-container">
      <Header current={activeAnimation} onSelect={setActiveAnimation} />

      <main className="content">
        {activeAnimation === 'ball' && <BallAnimation />}
      </main>
    </div>
  );
};
