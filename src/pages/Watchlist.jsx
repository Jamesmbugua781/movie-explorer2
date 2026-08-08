import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import MovieCard from '../components/MovieCard';
import { Bookmark } from 'lucide-react';

const Watchlist = () => {
  const { watchlist } = useContext(AppContext);

  return (
    <div className="content-container page-container">
      <div className="page-header">
        <Bookmark className="page-icon" size={32} />
        <h2 className="page-title">Your Watchlist</h2>
      </div>
      {watchlist.length > 0 ? (
        <div className="movies-grid">
          {watchlist.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Bookmark size={48} className="empty-icon" />
          <p>Your watchlist is empty. Add movies you want to watch later!</p>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
