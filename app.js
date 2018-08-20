const form = document.querySelector('form');
form.addEventListener('submit', formSubmited);
const inputText = document.querySelector('#searchText');

function formSubmited(e){
    const searchText = inputText.value;
    console.log(searchText);
    getMovies(searchText);
    e.preventDefault();
}
// Get all movies
function getMovies(searchText){

    //make request to api using axios
    // Make a request for a user with a given ID
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=c9e28c9b1d0d87033d38b67bc5bfe1e3&language=en-US&query=" + searchText)
      .then( response => {
        let movies = response.data.results;
        console.log(movies);
        let output = '';
            movies.forEach( movie => {
            output+=`
            <div class="col-md-3">
              <div class="card text-center p-3 mb-3">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                <h5 class="card-title">${movie.title}</h5>
                <button onclick="movieSelected(${movie.id})" type="button" class="details btn btn-danger" href="#">Movie Details</button>
              </div>
             
            </div>
          `;
        });
        document.querySelector('#movies').innerHTML = output;
      })
      .catch(error => console.log(error)); 
  }

// Get id to handle dinamic button event when full list is shown
  function movieSelected (id){
      sessionStorage.setItem('movieId', id);
      window.location = 'movie.html';
      return false;
  }

// Get single movie
  function getSingleMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get("https://api.themoviedb.org/3/movie/"+ movieId + "?api_key=c9e28c9b1d0d87033d38b67bc5bfe1e3&append_to_response=images")
    .then(response => {
      let movie = response.data;
      console.log(movie);
      let output =`
        <div class="row">
          <div class="col-md-5">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-7">
            <h3 class="card-header text-secondary">${movie.title}</h3>
            <p class=" card-text text-justify">${movie.overview} </p>
            <ul class="list-group">
              <li class="list-group-item"><strong>Popularity:</strong> ${movie.popularity}</li>
              <li class="list-group-item"><strong>Relesed:</strong> ${movie.release_date}</li>
            </ul>
          </div>
        </div>
      `;
      document.querySelector('#movie').innerHTML = output;
    })
    .catch(err => console.log(err));
}
