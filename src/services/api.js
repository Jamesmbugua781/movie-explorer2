const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchFromTMDB = async (endpoint, params = '') => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}${params}`);
    if (!res.ok) throw new Error('Failed to fetch from TMDB');
    return await res.json();
  } catch (error) {
    console.error('TMDB Fetch Error:', error);
    return null;
  }
};

export const getTrending = () => fetchFromTMDB('/trending/movie/day');
export const getPopular = () => fetchFromTMDB('/movie/popular');
export const getTopRated = () => fetchFromTMDB('/movie/top_rated');
export const getUpcoming = () => fetchFromTMDB('/movie/upcoming');
export const searchMovies = (query) => fetchFromTMDB('/search/movie', `&query=${encodeURIComponent(query)}`);
export const getMovieDetails = (id) => fetchFromTMDB(`/movie/${id}`, '&append_to_response=videos,credits,similar');
