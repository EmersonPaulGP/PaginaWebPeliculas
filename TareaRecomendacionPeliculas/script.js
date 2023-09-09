const apiKey = 'your_api_key_here'; // Replace with your API key
const apiUrl = 'https://api.themoviedb.org/3';

const genreSelect = document.getElementById('genreSelect');
const moviesContainer = document.getElementById('movies');

// Fetch genres and populate the select element
fetch(`${apiUrl}/genre/movie/list?language=es&api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
        data.genres.forEach((genre) => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            genreSelect.appendChild(option);
        });
    })
    .catch((error) => console.error(error));

// Function to fetch and display movies
function fetchMovies(genreId = '') {
    moviesContainer.innerHTML = '';

    const language = 'es'; // Change to 'en' for English
    const url = `${apiUrl}/movie/popular?language=${language}&api_key=${apiKey}&with_genres=${genreId}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data.results.forEach((movie) => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');

                const posterImg = document.createElement('img');
                posterImg.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                posterImg.alt = movie.title;

                const movieInfoDiv = document.createElement('div');
                movieInfoDiv.classList.add('movie-info');

                const title = document.createElement('h2');
                title.classList.add('movie-title');
                title.textContent = movie.title;

                const description = document.createElement('p');
                description.classList.add('movie-description');
                description.textContent = movie.overview;

                movieInfoDiv.appendChild(title);
                movieInfoDiv.appendChild(description);

                movieDiv.appendChild(posterImg);
                movieDiv.appendChild(movieInfoDiv);

                moviesContainer.appendChild(movieDiv);
            });
        })
        .catch((error) => console.error(error));
}

// Event listener for genre select change
genreSelect.addEventListener('change', (event) => {
    const selectedGenreId = event.target.value;
    fetchMovies(selectedGenreId);
});

// Initial fetch with no genre filter
fetchMovies();
