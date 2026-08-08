import { NavLink, useNavigate } from 'react-router-dom';
import { Film, Search, Heart, Bookmark, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo" end>
          <Film className="logo-icon" size={24} />
          <span>NexaFlix</span>
        </NavLink>

        <form onSubmit={handleSearch} className="nav-search">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className="nav-links">
          <NavLink to="/favorites" className={navClass} title="Favorites">
            <Heart size={20} />
            <span className="nav-text">Favorites</span>
          </NavLink>
          <NavLink to="/watchlist" className={navClass} title="Watchlist">
            <Bookmark size={20} />
            <span className="nav-text">Watchlist</span>
          </NavLink>
          <button className="nav-profile" title="Profile">
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
