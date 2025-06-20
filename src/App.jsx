import React, { useEffect, useState } from "react";
import hero from './assets/hero.png';
import Search from "./components/Search";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers:{
    accept: 'applications/json',
    Authorization:` Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm]= useState('');
  useEffect(()=>{

  },[]);
  
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src={hero} alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            without the Hassle
          </h1>
           <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
       
      </div>
    </main>
  );
};

export default App;
