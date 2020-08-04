$(document).ready(function(){
    $('#searchForm').on("submit" , function(e){
        let searchText = $("#searchText").val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText){
    axios.get("https://www.omdbapi.com?apikey=449aa3ba&s="+searchText)
    .then(function(response){
        console.log(response);
        let movies = response.data.Search;
        let output = " ";
        $.each(movies, (index, movie)=> {
            output += `
                <div class="col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center" style="padding-bottom:15px">
                    <div class="well text-center">
                        <img src="${movie.Poster}" class="img-thumbnail" style="position:relative;object-fit:cover;border:none;background-color:transparent;width:100%"/>
                        <h5 style="color:black">${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-dark" style="border-radius: 60px;background-color: #3f3d56;width: 100%;height: 43px;font-size: 16px;line-height: 1.466667;text-transform: uppercase;color: white;border: none;outline: none;cursor: pointer;text-align: center" href="#">Movie Details</a>
                    </div>
                </div>
                `;
            $("#movies").html(output);
        });
    }) 
    .catch(function(err){
        console.log(err);
        });
}



function movieSelected(id){
    sessionStorage.setItem("movieID", id);
    window.location="movdetails.html";
    return false;
}

function getMovieDetail(){
    let id = sessionStorage.getItem("movieID");
    axios.get("https://www.omdbapi.com?apikey=449aa3ba&i="+id)
    .then(function(response){
        console.log(response);
        let movie = response.data;
        
        let output=`
            <div class="row">
                <div class="col-md-4 d-flex justify-content-center align-items-center">
                <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-4 col-lg-8" style="color:white;font-size:16px">
                <h2 style="text-align:center">${movie.Title}</h2>
                <ul class="list-group">
                    <li><strong>Released:${movie.Released}</strong></li>
                    <li><strong>Genre:${movie.Genre}</strong></li>
                    <li><strong>Director:${movie.Director}</strong></li>
                    <li><strong>Actors:${movie.Actors}</strong></li>
                    <li><strong>Runtime:${movie.Runtime}</strong></li>
                    <li><strong>Plot:${movie.Plot}</strong></li>
                    <li><strong>Rated:${movie.Rated}</strong></li>
                </ul>
                </div>                
                `;
        $("#movies").html(output);
    })
    .catch(function(response){
        console.log(err);
    });
}


