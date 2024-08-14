const API_KEY = '1bfdbff05c2698dc917dd28c08d41096';
const UPCOMING_MOVIES_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;

function fetchUpcomingMovies() {
  fetch(UPCOMING_MOVIES_URL)
    .then(response => response.json())
    .then(data => displayUpcomingMovies(data.results))
    .catch(error => console.error('Error fetching upcoming movies:', error));
}

function displayUpcomingMovies(movies) {
  const upcomingMoviesDiv = document.getElementById('upcoming-movies');
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <h3>${movie.title}</h3>
      <p>Release Date: ${movie.release_date}</p>
      <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
    `;
    upcomingMoviesDiv.appendChild(movieCard);
  });
}

// Fetch upcoming movies on page load
fetchUpcomingMovies();
const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');

searchBtn.addEventListener('click', () => {
  const query = searchBar.value;
  if (query) {
    searchMovie(query);
  }
});

function searchMovie(query) {
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
  
  fetch(SEARCH_URL)
    .then(response => response.json())
    .then(data => displaySearchedMovies(data.results))
    .catch(error => console.error('Error searching for movies:', error));
}

function displaySearchedMovies(movies) {
  const upcomingMoviesDiv = document.getElementById('upcoming-movies');
  upcomingMoviesDiv.innerHTML = '';  // Clear previous results
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <h3>${movie.title}</h3>
      <p>Release Date: ${movie.release_date}</p>
      <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
    `;
    upcomingMoviesDiv.appendChild(movieCard);
  });
}
function displaySearchedMovies(movies) {
    const upcomingMoviesDiv = document.getElementById('upcoming-movies');
    upcomingMoviesDiv.innerHTML = '';  // Clear previous results
    movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');
      movieCard.innerHTML = `
        <h3>${movie.title}</h3>
        <p>Release Date: ${movie.release_date}</p>
        <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
      `;
      movieCard.addEventListener('click', () => displayMovieDetails(movie.id));
      upcomingMoviesDiv.appendChild(movieCard);
    });
  }
  
  function displayMovieDetails(movieId) {
    const MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    
    fetch(MOVIE_DETAILS_URL)
      .then(response => response.json())
      .then(data => {
        const movieDetailsDiv = document.getElementById('movie-details');
        movieDetailsDiv.innerHTML = `
          <h2>${data.title}</h2>
          <p>${data.overview}</p>
          <p>Runtime: ${data.runtime} minutes</p>
          <img src="http://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.title}" />
        `;
      })
      .catch(error => console.error('Error fetching movie details:', error));
  }
  function displaySimilarMovies(movieId) {
    const SIMILAR_MOVIES_URL = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`;
    
    fetch(SIMILAR_MOVIES_URL)
      .then(response => response.json())
      .then(data => {
        const similarMoviesDiv = document.getElementById('similar-movies');
        similarMoviesDiv.innerHTML = '';  // Clear previous results
        data.results.forEach(movie => {
          const movieCard = document.createElement('div');
          movieCard.classList.add('movie-card');
          movieCard.innerHTML = `
            <h3>${movie.title}</h3>
            <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
          `;
          similarMoviesDiv.appendChild(movieCard);
        });
      })
      .catch(error => console.error('Error fetching similar movies:', error));
  }
  
  // Call this function within displayMovieDetails to load similar movies
  displaySimilarMovies(movieId);
    