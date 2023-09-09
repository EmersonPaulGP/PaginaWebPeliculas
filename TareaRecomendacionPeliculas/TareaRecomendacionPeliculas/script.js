document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "https://api.themoviedb.org/3/movie/popular?language=es"; 

    const languageSelect = document.getElementById("language");
    const genreSelect = document.getElementById("genre");
    const loadMoviesButton = document.getElementById("loadMovies");
    const movieList = document.getElementById("movieList");

    function loadGenres() {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${languageSelect.value}`)
            .then((response) => response.json())
            .then((data) => {
                genreSelect.innerHTML = "";
                data.genres.forEach((genre) => {
                    const option = document.createElement("option");
                    option.value = genre.id;
                    option.textContent = genre.name;
                    genreSelect.appendChild(option);
                });
            })
            .catch((error) => console.error(error));
    }

    function loadPopularMovies() {
        const language = languageSelect.value;
        const genreIds = genreSelect.value;
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}&with_genres=${genreIds}`)
            .then((response) => response.json())
            .then((data) => {
                movieList.innerHTML = "";
                data.results.forEach((movie) => {
                    const movieDiv = document.createElement("div");
                    movieDiv.classList.add("movie");

                    const posterPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                    const image = document.createElement("img");
                    image.src = posterPath;

                    const title = document.createElement("h2");
                    title.textContent = movie.title;

                    const description = document.createElement("p");
                    description.textContent = movie.overview;

                    movieDiv.appendChild(image);
                    movieDiv.appendChild(title);
                    movieDiv.appendChild(description);

                    movieList.appendChild(movieDiv);
                });
            })
            .catch((error) => console.error(error));
    }

    loadGenres();

    loadMoviesButton.addEventListener("click", loadPopularMovies);
});
