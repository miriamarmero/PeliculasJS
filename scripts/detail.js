import films from './films.js';

let imgPoster = 'http://image.tmdb.org/t/p/w185/'

window.addEventListener('load', load);

function load() {
    let url = new URL(window.location.href);
    let result = url.searchParams.get('id');
    let film = films.find((iteracion) => result == iteracion.id)
    let body = document.querySelector('body');
    let divFilm = document.createElement('article');
    
    divFilm.innerHTML = `
    <img src="${imgPoster}${film.poster_path}" alt="${film.title}>
    <p class="title">${film.title}</p>
    <p class="vote">${film.vote_average}</p>
    <p class="overview">${film.overview}</p>
    `;

    body.appendChild(divFilm);

};