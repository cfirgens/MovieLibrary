// (function($){
//     function processForm( e ){
//         var dict = {
//         	Title : this["title"].value,
//         	Director: this["director"].value
//         };
//
//         $.ajax({
//             url: 'https://localhost:44370/api/movie',
//             dataType: 'json',
//             type: 'post',
//             contentType: 'application/json',
//             data: JSON.stringify(dict),
//             success: function( data, textStatus, jQxhr ){
//                 $('#response pre').html( data );
//             },
//             error: function( jqXhr, textStatus, errorThrown ){
//                 console.log( errorThrown );
//             }
//         });
//
//         e.preventDefault();
//     }
//
//     $('#my-form').submit( processForm );
// })(jQuery);




//Get and display into table

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
