$(document).on("turbolinks:load",function() {
  $("#list-menu").on('click', function(e){
    e.preventDefault();
    $(".main-header__menu-box__ul__lists__list").fadeIn(2000);
    $("#list-menu").fadeOut(300);
  })

  $(function(){
    let navPos = $("#header-nav").offset().top;

    $(window).scroll(function(){
      if($(window).scrollTop() > navPos){
        $("#header-nav").css({"position":"fixed","top":0,"width":"100%"})
      } else {
        $("#header-nav").css("position", "static")
      }
    })
  })
})