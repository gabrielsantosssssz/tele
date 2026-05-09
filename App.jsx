import React from 'react';
import Hero from './components/Hero';
import Mindset from './components/Mindset';
import Areas from './components/Areas';
import Gamification from './components/Gamification';
import Form from './components/Form';
import './App.css';

function App() {
  return (
    <div className="App">
      <Hero />
      <Mindset />
      <Areas />
      <Gamification />
      <Form />
    </div>
  );
}

export default App;
