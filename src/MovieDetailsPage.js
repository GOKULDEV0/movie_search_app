import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const API_KEY = 'c119a3aa';

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) return <div className="movie-detail-loading">Loading...</div>;

  return (
    <div className='movieDetailBody'>
      <div className="container">
        <div className="header">
          <div className="poster">
            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'} alt="Poster" />
          </div>
          <div className="info">
            <h1>{movie.Title} ({movie.Year})</h1>
            <p><span>Rated:</span> {movie.Rated}</p>
            <p><span>Released:</span> {movie.Released}</p>
            <p><span>Runtime:</span> {movie.Runtime}</p>
            <p><span>Genre:</span> {movie.Genre}</p>
            <p><span>Director:</span> {movie.Director}</p>
            <p><span>Writer:</span> {movie.Writer}</p>
            <p><span>Actors:</span> {movie.Actors}</p>
          </div>
        </div>

        <div className="section">
          <h2>Plot</h2>
          <p>{movie.Plot}</p>
        </div>

        <div className="section">
          <h2>Details</h2>
          <p><span>Language:</span> {movie.Language}</p>
          <p><span>Country:</span> {movie.Country}</p>
          <p><span>Awards:</span> {movie.Awards}</p>
          <p><span>Box Office:</span> {movie.BoxOffice}</p>
        </div>

        <div className="section">
          <h2>Ratings</h2>
          <div className="ratings">
            {movie.Ratings.map((rating, index) => (
              <span key={index}>{rating.Source}: {rating.Value}</span>
            ))}
          </div>
        </div>

        <div className="footer">
          Data from OMDb API | IMDb ID: {movie.imdbID}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
