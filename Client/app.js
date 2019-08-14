
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
  return data;
}

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
          movie_data+= '<td>' + value.Genre + '</td>';
          movie_data += '</tr>';
        });
      $('#movieTable').append(movie_data);
      GetAllMovies();
    }
  })
}

//Edit
let dropdown = $('#edit');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose Movie To Edit</option>');
dropdown.prop('selectedIndex', 0);

const url = 'https://localhost:44370/api/movie';

// Populate dropdown with list of movies
$.getJSON(url, function (data) {
  $.each(data, function (key, entry) {
    dropdown.append($('<option></option>').text(entry.Title));
  })
});

GetAllMovies();
