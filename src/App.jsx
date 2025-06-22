import React, { useEffect, useState } from "react";
import hero from "./assets/hero.png";
import Search from "./components/Search";
import Spinner from "./components/Spinner";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "applications/json",
    Authorization: ` Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();

      // console.log(data);
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      // if we succeed will show the movies
      setMovieList(data.results || []);
    } catch (error) {
      // if not will show the error message
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error feetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  // here we are calling fetch movies
  useEffect(() => {
    fetchMovies();
  }, []);

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
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {/* will check currently isloading */}
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <p key={movie.id} className="text-white">
                  {movie.title}
                </p>
              ))}
            </ul>
          )}
          {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}
        </section>
      </div>
    </main>
  );
};

export default App;
