import React from 'react';
// import logo from './logo.svg';
import './tailwind.output.css';
import './App.css';
import Minimalist from './components/Minimalist'

function App() {
  return (
    <div className="App min-h-screen flex flex-wrap bg-gray-600 lg:p-12 p-2">
      <div className="lg:w-1/2 mr-auto ml-auto">
        <h1 className="font-bold text-white lg:text-2xl lg:pb-12 p-2">Chronicon Mysterious Crystals resolver</h1>
        <Minimalist className=""/>
      </div>
    </div>
  );
}

export default App;
