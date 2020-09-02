import React from 'react';
// import logo from './logo.svg';
import './tailwind.output.css';
import './App.css';
import Game from './components/Game'

function App() {
  return (
    <div className="App min-h-screen flex flex-wrap bg-gray-500">
      <Game className="w-1/2 mr-auto ml-auto bg-white mt-4 mb-4"/>
    </div>
  );
}

export default App;
