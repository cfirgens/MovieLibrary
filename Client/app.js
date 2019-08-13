(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
        	Director: this["director"].value
        };

        $.ajax({
            url: 'https://localhost:44370/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form').submit( processForm );
})(jQuery);




//Get and display into table
$(document).ready(function () {
  $.ajax({
    url: 'https://localhost:44370/api/movie',
    dataType: "json",
    type: 'get',
    success: function(data) {
      console.log('data', data);
        // $.each(Movie) {
        //   .$('#movieTable #tbody');
        //   movieTable.append('<tr><td>'
        //   + Movie.Title + '</td><td>' + Movie.DirectorName + '</td><td>' + Movies.Genre
        //   + '</td><td>'</tr>');
        //   }
      }
    });
  })
