import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();
  const [localQuery, setLocalQuery] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalQuery(query);
    const fetchResults = async () => {
      if (query) {
        setLoading(true);
        const data = await searchMovies(query);
        if (data) setResults(data.results.filter(m => m.poster_path));
        setLoading(false);
      } else {
        setResults([]);
      }
    };
    fetchResults();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(localQuery.trim())}`);
    }
  };

  return (
    <div className="search-page">
      <div className="search-hero">
        <h1 className="search-hero-title">Find Your Next Movie</h1>
        <p className="search-hero-sub">Search from thousands of movies across all genres</p>
        <form onSubmit={handleSubmit} className="search-bar-form">
          <SearchIcon size={22} className="search-bar-icon" />
          <input
            type="text"
            className="search-bar-input"
            placeholder="Search by title, actor, genre..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            autoFocus
          />
          <button type="submit" className="search-bar-btn">Search</button>
        </form>
      </div>

      <div className="content-container page-container">
        {query && (
          <h2 className="page-title search-results-title">
            {loading ? 'Searching...' : `Results for "${query}" — ${results.length} found`}
          </h2>
        )}

        {loading ? (
          <div className="loading">
            <div className="loading-spinner-small"></div>
            <p>Fetching results...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="movies-grid">
            {results.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : query ? (
          <p className="no-results">No movies found for "{query}". Try a different search.</p>
        ) : (
          <div className="search-placeholder">
            <SearchIcon size={64} className="search-placeholder-icon" />
            <p>Start typing above to discover movies</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
