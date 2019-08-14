
//Get and display into table
function GetAllMovies(){
  $(document).ready(function () {
    $.ajax({
      type:'GET',
      url: 'https://localhost:44370/api/movie',
      dataType: 'json',
      success: function(data) {
        var movie_data = '';
          $.each(data, function(key,value){
            movie_data += '<tr>';
            movie_data += '<td>' + value.Title + '</td>';
            movie_data += '<td>' + value.DirectorName + '</td>';
            movie_data+= '<td>' + value.Genre + '</td>';
            movie_data += '</tr>';
          });
          $('#movieTable').append(movie_data);
        }
      });
  });
}

function GetMovieObject(){
  var data = {
    "Title": document.getElementById('titleInput').value,
    "DirectorName": document.getElementById('directorInput').value,
    "Genre": document.getElementById('genreInput').value
  };
}

function CreateMovie(){
  var data = GetMovieObject();
  $.ajax({
    type:'POST',
    url: 'https://localhost:44370/api/movie',
    dataType: 'json',
    success: function(data){
      var movie_data = '';
        $.each(data, function(key,value){
          movie_data += '<tr>';
          movie_data += '<td>' + value.Title + '</td>';
          movie_data += '<td>' + value.DirectorName + '</td>';
          movie_data+= '<td>' + value.Genre + '</td>';
          movie_data += '</tr>';
        });
      $('#movieTable').append(movie_data);
    }    
  })
}

GetAllMovies();
