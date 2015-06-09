// $( document ).ready(function() {
//
//   //
//
// });

$(function() {
  smoothScrool(8000);
});

// smoothScrool function is applied from the document ready function
function smoothScrool(duration) {
  $('a[href^"#"]').on('click', function(event){

    var target = $( $(this).attr('href') );

    if(target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, duration);
    }
  });
}
