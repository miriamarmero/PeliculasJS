import films from './films.js';

let imgPoster = 'http://image.tmdb.org/t/p/w185/'

window.addEventListener('load', () => {
    let divFilms = document.querySelector('#films');
    
    films.forEach((film) => {
        let divFilm = document.createElement('article');
        divFilm.innerHTML = `
        <img src="${imgPoster}${film.poster_path}" alt="${film.title}>
        <p class="title">${film.title}</p>
        <p class="vote">${film.vote_average}</p>
        <p class="date">${film.release_date}</p>
        `;

        

        divFilms.appendChild(divFilm);
    });
    
    let buttonBuscar = document.querySelector('#btnBuscar');
        buttonBuscar.addEventListener('click', buscar);
        console.log(buttonBuscar);

    function buscar() {
        console.log('buscar');
        let inputElement = document.querySelector('#inputBusqueda');
        console.log(inputElement.value);
    }
});

