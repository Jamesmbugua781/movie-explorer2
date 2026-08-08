import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrending, getPopular, getTopRated, getUpcoming, getMovieDetails } from '../services/api';
import MovieSection from '../components/MovieSection';
import TrailerModal from '../components/TrailerModal';
import { Film, Play, Info } from 'lucide-react';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTrailerKey, setActiveTrailerKey] = useState(null);
  const [isFetchingTrailer, setIsFetchingTrailer] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [trendData, popData, topData, upData] = await Promise.all([
          getTrending(), getPopular(), getTopRated(), getUpcoming()
        ]);
        
        if (trendData) setTrending(trendData.results);
        if (popData) setPopular(popData.results);
        if (topData) setTopRated(topData.results);
        if (upData) setUpcoming(upData.results);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleWatchTrailer = async (movieId) => {
    if (isFetchingTrailer) return;
    setIsFetchingTrailer(true);
    try {
      const details = await getMovieDetails(movieId);
      const trailer = details?.videos?.results?.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (trailer) {
        setActiveTrailerKey(trailer.key);
      } else {
        alert('Sorry, no trailer is available for this movie.');
      }
    } catch (err) {
      console.error('Error fetching trailer:', err);
    } finally {
      setIsFetchingTrailer(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <Film className="loading-spinner" size={48} />
        <p>Loading NexaFlix...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="hero-section" style={{
        backgroundImage: trending.length > 0 ? `url(https://image.tmdb.org/t/p/original${trending[0].backdrop_path})` : 'none'
      }}>
        <div className="hero-overlay"></div>
        {trending.length > 0 && (
          <div className="hero-content">
            <h1 className="hero-title">{trending[0].title}</h1>
            <p className="hero-overview">{trending[0].overview}</p>
            <div className="hero-actions">
              <button 
                className="hero-btn hero-btn-primary"
                onClick={() => handleWatchTrailer(trending[0].id)}
                disabled={isFetchingTrailer}
              >
                <Play size={20} fill="currentColor" /> {isFetchingTrailer ? 'Loading...' : 'Play Trailer'}
              </button>
              <Link 
                to={`/movie/${trending[0].id}`} 
                className="hero-btn hero-btn-secondary"
              >
                <Info size={20} /> More Info
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="content-container">
        <MovieSection title="Trending Today" movies={trending} />
        <MovieSection title="Popular on NexaFlix" movies={popular} />
        <MovieSection title="Top Rated Masterpieces" movies={topRated} />
        <MovieSection title="Upcoming Releases" movies={upcoming} />
      </div>

      {activeTrailerKey && (
        <TrailerModal trailerKey={activeTrailerKey} onClose={() => setActiveTrailerKey(null)} />
      )}
    </div>
  );
};

export default Home;
