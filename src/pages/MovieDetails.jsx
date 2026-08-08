import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Bookmark, Play, Star } from 'lucide-react';
import { getMovieDetails } from '../services/api';
import { AppContext } from '../context/AppContext';
import MovieSection from '../components/MovieSection';
import TrailerModal from '../components/TrailerModal';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  
  const { favorites, watchlist, toggleFavorite, toggleWatchlist } = useContext(AppContext);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const data = await getMovieDetails(id);
      setMovie(data);
      setLoading(false);
      window.scrollTo(0,0);
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="loading-screen">Loading Details...</div>;
  if (!movie) return <div className="error-screen">Movie not found</div>;

  const isFavorite = favorites.some(m => m.id === movie.id);
  const isInWatchlist = watchlist.some(m => m.id === movie.id);

  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const cast = movie.credits?.cast?.slice(0, 8) || [];
  const similar = movie.similar?.results?.slice(0, 10) || [];

  return (
    <div className="movie-details-page">
      <div 
        className="details-hero" 
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="details-overlay">
          <div className="details-content content-container">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="details-poster" 
            />
            <div className="details-info">
              <h1 className="details-title">
                {movie.title} <span className="details-year">({new Date(movie.release_date).getFullYear()})</span>
              </h1>
              <div className="details-meta">
                <span className="rating"><Star size={16} className="star-icon" fill="currentColor"/> {movie.vote_average.toFixed(1)}</span>
                <span>{movie.runtime} min</span>
                <span className="genres">{movie.genres.map(g => g.name).join(', ')}</span>
              </div>
              
              <div className="details-actions">
                {trailer && (
                  <button onClick={() => setIsTrailerOpen(true)} className="btn btn-primary">
                    <Play size={20} fill="currentColor" /> Watch Trailer
                  </button>
                )}
                <button 
                  className={`btn btn-secondary ${isFavorite ? 'active' : ''}`}
                  onClick={() => toggleFavorite(movie)}
                >
                  <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} /> 
                  {isFavorite ? 'Favorited' : 'Favorite'}
                </button>
                <button 
                  className={`btn btn-secondary ${isInWatchlist ? 'active' : ''}`}
                  onClick={() => toggleWatchlist(movie)}
                >
                  <Bookmark size={20} fill={isInWatchlist ? 'currentColor' : 'none'} />
                  {isInWatchlist ? 'In Watchlist' : 'Watchlist'}
                </button>
              </div>

              <div className="overview">
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container additional-details">
        {cast.length > 0 && (
          <div className="cast-section">
            <h2>Top Cast</h2>
            <div className="cast-grid">
              {cast.map(person => (
                <div key={person.id} className="cast-card">
                  <img 
                    src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Image'} 
                    alt={person.name} 
                  />
                  <div className="cast-info">
                    <h4>{person.name}</h4>
                    <p>{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {similar.length > 0 && (
          <MovieSection title="Similar Movies" movies={similar} />
        )}
      </div>

      {isTrailerOpen && trailer && (
        <TrailerModal trailerKey={trailer.key} onClose={() => setIsTrailerOpen(false)} />
      )}
    </div>
  );
};

export default MovieDetails;
