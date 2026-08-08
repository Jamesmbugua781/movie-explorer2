import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bookmark, Star } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const MovieCard = ({ movie }) => {
  const { favorites, watchlist, toggleFavorite, toggleWatchlist } = useContext(AppContext);

  const isFavorite = favorites.some(m => m.id === movie.id);
  const isInWatchlist = watchlist.some(m => m.id === movie.id);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="movie-card">
      <div className="movie-poster-wrapper">
        <Link to={`/movie/${movie.id}`}>
          <img src={posterUrl} alt={movie.title} className="movie-poster" loading="lazy" />
        </Link>
        <div className="movie-overlay">
          <button
            className={`action-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); toggleFavorite(movie); }}
            title="Add to Favorites"
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            className={`action-btn ${isInWatchlist ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); toggleWatchlist(movie); }}
            title="Add to Watchlist"
          >
            <Bookmark size={18} fill={isInWatchlist ? 'currentColor' : 'none'} />
          </button>
        </div>
        {movie.vote_average > 0 && (
          <div className="movie-rating">
            <Star size={11} fill="currentColor" />
            {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <span className="movie-date">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
