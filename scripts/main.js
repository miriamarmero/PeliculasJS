const IMG_POST = 'http://image.tmdb.org/t/p/w185/'
const IMG_PATH_BACKDROP = 'http://image.tmdb.org/t/p/w1280';
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '9dae512f804c52ab91f98bab2a9ead6d';
const API_POPULAR_URL = 'movie/popular';
const API_CATEGORIES = 'genre/movie/list';

let films = []

window.addEventListener('load', async () => {

    let response = await axios.get(API_URL + API_POPULAR_URL + '?api_key=' + API_KEY)
    let films = response.data.results;
    response = films;

    function printFilms(show) {
        let sectionFilms = document.querySelector('#films');
        sectionFilms.innerHTML = '';

        show.forEach((film) => {
            let articleFilm = document.createElement('article');
            let {poster_path, title, vote_average, release_date, id} = film;
            articleFilm.innerHTML = `
            <a href="/film.html?id=${id}"> <img src="${IMG_POST}${poster_path}" alt="${title}></a>
            <p class="title fav">${title}</p>
            <p class="vote">${vote_average}</p>
            <p class="date">${release_date}</p>
            `;
            sectionFilms.appendChild(articleFilm);
        });
    };

    let buttonSearch = document.querySelector('#btnBuscar');
    buttonSearch.addEventListener('click', buscar);

    function buscar() {
        let inputElement = document.querySelector('#inputBusqueda').value;
        let searchElement = films.filter(film => film.title.toLowerCase().includes(inputElement.toLowerCase()));
        printFilms(searchElement);
    };

    let btnOrdenar = document.querySelector('#ordenar');
    btnOrdenar.addEventListener('click', ordenar);

    function ordenar() {
        films.sort((a, b) => {
            let film1 = a.title.toLowerCase(),
                film2 = b.title.toLowerCase();
            if (film1 > film2) {
                return 1
            } else if (film1 < film2) {
                return -1
            }
            return 0
        });
        printFilms(films);
    };

    let btnOrdenarVote = document.querySelector('#btnOrdenVote')
    btnOrdenarVote.addEventListener('click', ordenarVote)

    function ordenarVote() {
        films.sort((a, b) => {
            let film1 = a.vote_average,
                film2 = b.vote_average;
            if (film1 < film2) {
                return 1
            } else if (film1 > film2) {
                return -1
            }
            return 0
        });
        printFilms(films);
    };

    let btnOrdenarDate = document.querySelector('#btnOrdenarDate')
    btnOrdenarDate.addEventListener('click', ordenarDate)

    function ordenarDate() {
        films.sort((a, b) => {
            let film1 = a.release_date,
                film2 = b.release_date;
            if (film1 > film2) {
                return 1
            } else if (film1 < film2) {
                return -1
            }
            return 0
        });
        printFilms(films)
    };

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favorites.forEach(function (favorite) {
        document.getElementById(favorite).className = 'fav';
    });

    document.querySelector('#films').addEventListener('click', function (e) {
        let title = e.target.title,
            item = e.target,
            index = favorites.indexOf(title);
        if (!title) return;
        if (index == -1) {
            favorites.push(title);
            item.className = 'fav';
        } else {
            favorites.splice(index, 1);
            item.className = '';
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
});