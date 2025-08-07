
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = 'c119a3aa';
  const navigate = useNavigate();

  const fetchMovies = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setLoading(true);
    setMovies([]);

    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(search)}&apikey=${apiKey}`);
      const data = await res.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Welcome to MovieScope</h1>
          <h1>Find Your Next Favorite Film</h1>
          <p className="tagline">Explore your favorite movies in a cool dark theme</p>
          <form className="search-bar" onSubmit={fetchMovies}>
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>

      <div className="movie-grid">
        {loading ? (
          <p>Loading...</p>
        ) : movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                alt={movie.Title}
              />
              <div className="movie-details">
                <h3>{movie.Title}</h3>
                <p><strong>Year:</strong> {movie.Year}</p>
                <p><strong>Type:</strong> {movie.Type}</p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default SearchPage;
