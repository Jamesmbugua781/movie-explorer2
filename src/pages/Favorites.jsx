import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import MovieCard from '../components/MovieCard';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const { favorites } = useContext(AppContext);

  return (
    <div className="content-container page-container">
      <div className="page-header">
        <Heart className="page-icon" size={32} />
        <h2 className="page-title">Your Favorites</h2>
      </div>
      {favorites.length > 0 ? (
        <div className="movies-grid">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Heart size={48} className="empty-icon" />
          <p>You haven't added any movies to your favorites yet.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
