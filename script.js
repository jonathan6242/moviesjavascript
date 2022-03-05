// API KEY: "http://www.omdbapi.com/?i=tt3896198&apikey=74514e3b"
const input = document.querySelector('.banner__search');
const movieList = document.querySelector('.main__data');
const filterInput = document.querySelector('.filter');
const searchResults = document.querySelector('.main__top--title');

let dataList;

async function render() {
    if(input.value === "") {
        resetInputs();
        return;
    }
    updateSearchDisplay();
    document.body.classList.remove("no-results");
    movieList.innerHTML = `<div class="loading-state">
        <i class="fas fa-spinner"></i>
    </div>
    <div class="not-found">
        <figure class="not-found__img--wrapper">
            <img src="./assets/undraw_web_search_re_efla.svg" alt="">
        </figure>
        <h4 class="not-found__title">Sorry, we couldn't find what you were looking for.</h4>
        <h5 class="not-found__subtitle">Please adjust your search or filter.</h5>
        <button class="not-found__reset" onclick="resetInputs()">Reset filter</button>
    </div>`;
    document.body.classList.toggle('loading');
    let filterString;
    if(filterInput.value) {
        filterString = `&y=${+filterInput.value}`;
    } else {
        filterString = "";
    }
    
    const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=74514e3b&s="${input.value}"${filterString}`);
    const data = await res.json();
    document.body.classList.toggle('loading');

    dataList = data["Search"];
    if(!dataList) {
        document.body.classList.add("no-results");
        return;
    }
    if(dataList.length >= 6) {
        dataList = dataList.splice(0, 6);
    } else {
        dataList = dataList.splice(0, dataList.length)
    }

    const moviesHTML = dataList.map(movie => movieHTML(movie)).join("");

    movieList.innerHTML = moviesHTML;
}

function filterByYear(event) {
    const year = +event.target.value;
    if(input.value !== "") {
        render(year);
    }
}

function movieHTML(movie) {
    return `<div class="movie__wrapper">
        <div class="movie__card">
            <figure class="movie__img--wrapper">
                <div class="movie__img--overlay">
                    <p>More info <i class="fa-solid fa-arrow-right"></i></p>
                </div>
                <img src="${movie.Poster}" alt="" class="movie__img">
            </figure>
            <div class="movie__description">
                <h4 class="movie__title">${movie.Title}</h4>
                <h5 class="movie__year">${movie.Year}</h5>
            </div>
        </div>
    </div>`
}

function updateSearchDisplay() {
    if(input.value === "") {
        searchResults.innerHTML = "Search results:";
    } else {
        searchResults.innerHTML = `Search results for <b class="red">"${input.value}"</b>`;
    }
}

function resetInputs() {
    input.value = '';
    filterInput.value = '';
    movieList.innerHTML = `<div class="start">
        <figure class="start__img--wrapper">
            <img src="./assets/undraw_adventure_map_hnin.svg" alt="">
        </figure>
        <h4 class="start__title">Get started with Movies.</h4>
        <h5 class="start__subtitle">Search for your movie of interest.</h5>
    </div>`;
    searchResults.innerHTML = "Search results:";
}

function toggleModal() {
    document.body.classList.toggle("modal--open")
}


/* Poster: "https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg"
Title: "Fast & Furious 6"
Type: "movie"
Year: "2013"
imdbID: "tt1905041" */