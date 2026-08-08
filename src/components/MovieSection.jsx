import MovieCard from './MovieCard';

const MovieSection = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="movie-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
