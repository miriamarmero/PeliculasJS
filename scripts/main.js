import films from './films.js';

let imgPoster = 'http://image.tmdb.org/t/p/w185/'

window.addEventListener('load', () => {
    printFilms(films);

    let buttonSearch = document.querySelector('#btnBuscar');
    buttonSearch.addEventListener('click', buscar);
});

function printFilms(show){
    let divFilms = document.querySelector('#films');
        divFilms.innerHTML = '';

    show.forEach((film) => {
        let divFilm = document.createElement('article');
        let {poster_path, title, vote_average, release_date, id} = film;
        divFilm.innerHTML=`
        <a href="/film.html?id=${id}"> <img src="${imgPoster}${poster_path}" alt="${title}></a>
        <p class="title">${title}</p>
        <p class="vote">${vote_average}</p>
        <p class="date">${release_date}</p>
        `;
        divFilms.appendChild(divFilm);
    });
}  


function buscar(){
    let inputElement = document.querySelector('#inputBusqueda').value;
    let searchElement = films.filter(film => film.title.toLowerCase().includes(inputElement.toLowerCase()));
    printFilms(searchElement);
}