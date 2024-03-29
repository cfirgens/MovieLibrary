
//Get and display into table\\
function GetAllMovies(){
  $(document).ready(function () {
    $.ajax({
      type:'GET',
      url: 'https://localhost:44370/api/movie',
      dataType: 'json',
      success: function(data) {
        $('tbody').empty();
        var movie_data = '';
          $.each(data, function(key,value){
            movie_data += '<tr>';
            movie_data += '<td>' + value.Title + '</td>';
            movie_data += '<td>' + value.DirectorName + '</td>';
            movie_data += '<td>' + value.Genre  + '</td>'
            movie_data += '<td><button class="edit" onclick = "GetSpecificMovie('+value.MovieId+')"data-key="'+ (key + 1) +'">Edit</button>';
            movie_data += '<button class="delete" onclick = "DeleteMovie('+value.MovieId+')"data-key="'+ (key + 1) +'">Delete</button></td>';
            movie_data += '</tr>';
          });
          $('#movieTable').append(movie_data);
        }
      });
  });
}

// Get specific Movie \\
function GetSpecificMovie(movieId){
  $.ajax({
    type:'GET',
    url: 'https://localhost:44370/api/movie/'+movieId,
    dataType:'json',
    success: function(data){
      $("#titleInput").val(data.Title);
      $("#directorInput").val(data.DirectorName);
      $("#genreInput").val(data.Genre);
      $("#idInput").val(data.MovieId);
      document.documentElement.scrollTop = 0;
      return data;
    }
  })
}


//Get movie info \\
function GetMovieObject(){
  var data = {
    "Title": document.getElementById('titleInput').value,
    "DirectorName": document.getElementById('directorInput').value,
    "Genre": document.getElementById('genreInput').value,
    "MovieId": document.getElementById('idInput').value
  };
  return data;
}

//Create Movie Input \\
function CreateMovie(){
  var data = GetMovieObject();
  $.ajax({
    type:'POST',
    url: 'https://localhost:44370/api/movie',
    dataType: 'json',
    data: data,
    success: function(data){
      var movie_data = '';
        $.each(data, function(key,value){
          movie_data += '<tr>';
          movie_data += '<td>' + value.Title + '</td>';
          movie_data += '<td>' + value.DirectorName + '</td>';
          movie_data += '<td>' + value.Genre  + '</td>';
          movie_data += '<td><button class="edit" onclick = "GetSpecificMovie('+value.MovieId+')"data-key="'+ (key + 1) +'">Edit</button>';
          movie_data += '<button class="delete" onclick = "DeleteMovie('+value.MovieId+')"data-key="'+ (key + 1) +'">Delete</button></td>';
          movie_data += '</tr>';

        });
      $('#movieTable').append(movie_data);
    }
  }).then(function(data){
     GetAllMovies();
  })
}

// Edit \\
function EditMovie(){
  var selectedMovie = GetMovieObject();
  $.ajax({
    type: 'PUT',
    url: 'https://localhost:44370/api/movie',
    data: selectedMovie,
    success: function(selectedMovie){
      var newMovie = '';
      selectedMovie.Title = $("#titleInput").val();
      selectedMovie.DirectorName = $("#directorInput").val();
      selectedMovie.Genre = $("#genreInput").val();
      selectedMovie.MovieId = $("#idInput").val();
    }
  }).then(function(data){
     GetAllMovies();
  })
}



// Delete \\
function DeleteMovie(movieId){
  $.ajax({
    type:'DELETE',
    url: 'https://localhost:44370/api/movie/'+movieId,
    dataType:'json',
    success: function(data){
    }
  })
  .then(function(data){
    GetAllMovies();
  })
}


GetAllMovies();
