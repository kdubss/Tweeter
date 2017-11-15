$(document).ready(function(){
  console.log("The document is ready!");
  var maxLength = 140;

    $(".new-tweet textarea").keyup(function() {
    var length = $(this).val().length;
    var length = maxLength-length;
    // $(".counter").text(length);
    $(this).siblings(".counter").text(length);

    if(length < 0){
      $(this).siblings(".counter").css("color", "red");
    } else {
      $(this).siblings(".counter").css("color", "black");
    }
  });
});