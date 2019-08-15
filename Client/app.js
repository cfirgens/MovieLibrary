
//Get and display into table
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
            movie_data += '<td><button class="edit" onclick = "GetSpecificMovie('+value.MovieId+')"data-key="'+ (key + 1) +'">Edit</button></td>';
            movie_data += '</tr>';
          });
          $('#movieTable').append(movie_data);
        }
      });
  });
}

function GetSpecificMovie(movieId){
  console.log("hello");
  $.ajax({
    type:'GET',
    url: 'https://localhost:44370/api/movie/'+movieId,
    dataType:'json',
    success: function(data){
      $("#titleInput").val(data.Title);
      $("#directorInput").val(data.DirectorName);
      $("#genreInput").val(data.Genre);
      document.documentElement.scrollTop = 0;
    }
  })
}


//Get movie info
function GetMovieObject(){
  var data = {
    "Title": document.getElementById('titleInput').value,
    "DirectorName": document.getElementById('directorInput').value,
    "Genre": document.getElementById('genreInput').value
  };
  return data;
}

//Create Movie Input
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
          movie_data += '<td><button class="edit" onclick = "GetSpecificMovie('+value.MovieId+')"data-key="'+ (key + 1) +'">Edit</button></td>';
          movie_data += '</tr>';

        });
      $('#movieTable').append(movie_data);
      GetAllMovies();
    }
  })
}

// Edit
function EditMovie(){
  var selectedMovie = GetMovieObject();
  $.ajax({
    type: 'PUT',
    url: 'https://localhost:44370/api/movie',
    dataType: 'json',
    success: function(selectedMovie){
      var newMovie = '';
<<<<<<< HEAD
      $("#titleInput").val(data.Title);
      $("#directorInput").val(data.DirectorName);
      $("#genreInput").val(data.Genre);
     GetAllMovies();
=======
      selectedMovie.Title = $("#titleInput").val();
      selectedMovie.DirectorName = $("#directorInput").val();
      selectedMovie.Genre = $("#genreInput").val();

      GetAllMovies();
>>>>>>> 4fec22f9f08e042ca7fcb8052b8d80b295e580e2
    }

  })
}



<<<<<<< HEAD


$(document).ready(function(){
  $("td").click(function(){
    console.log("click");
    alert($("tr").val());
  });
});





=======
>>>>>>> 4fec22f9f08e042ca7fcb8052b8d80b295e580e2


GetAllMovies();
