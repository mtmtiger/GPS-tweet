$(document).on("turbolinks:load",function() {
  $("#list-menu").on('click', function(e){
    e.preventDefault();
    $(".main-header__menu-box__ul__lists__list").fadeIn(2000);
    $("#list-menu").fadeOut(300);
  })
})