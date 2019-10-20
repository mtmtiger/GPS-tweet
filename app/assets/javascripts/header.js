$(document).on("turbolinks:load",function() {
  $("#list-menu").on('click', function(e){
    e.preventDefault();
    $(".main-header__menu-box__ul__lists__list").fadeIn(2000);
    $("#list-menu").fadeOut(300);
  })

  $("#menu-first").on('click', function(){
    $("#menu-icon").show();
    $("#menu-icon").css("pointer-events","none");
    $("#menu-first").hide();
    $(".header__icon__box").toggleClass("black");
    $(".header__icon__box").animate({width:"100%"},500)
    $("#menu-icon").attr("data-order","open")
    let menuShow = function(){
      $("#menu-lists li:first-child").fadeIn();
      $("#menu-lists li:nth-child(2)").delay(200).fadeIn();
      $("#menu-lists li:nth-child(3)").delay(400).fadeIn();
      $("#menu-lists li:nth-child(4)").delay(600).fadeIn();
      $("#menu-lists li:nth-child(5)").delay(800).fadeIn();
      $("#menu-lists li:nth-child(6)").delay(1000).fadeIn();
    }
    let onEvents = function(){
      $("#menu-icon").css("pointer-events","auto");
    }
    setTimeout(menuShow, 500)
    setTimeout(onEvents, 1700)
  })
  $("#menu-icon").on('click', function(){
    if($(this).attr("data-order") === "open"){
      $("#menu-icon").css("pointer-events","none");
      $("#menu-lists li").fadeOut();
      $(this).attr("data-order",'close')
      let menuHide = function(){
        $(".header__icon__box").toggleClass("black");
        $(".header__icon__box").animate({width:"0"},500);
      }
      let onEvents = function(){
        $("#menu-icon").css("pointer-events","auto");
      }
      setTimeout(menuHide,400)
      setTimeout(onEvents, 1000)
    } else {
      $("#menu-icon").css("pointer-events","none");
      $(".header__icon__box").toggleClass("black");
      $(".header__icon__box").animate({width:"100%"},500);
      $(this).attr("data-order","open")
      let menuShow = function(){
        $("#menu-lists li:first-child").fadeIn();
        $("#menu-lists li:nth-child(2)").delay(200).fadeIn();
        $("#menu-lists li:nth-child(3)").delay(400).fadeIn();
        $("#menu-lists li:nth-child(4)").delay(600).fadeIn();
        $("#menu-lists li:nth-child(5)").delay(800).fadeIn();
        $("#menu-lists li:nth-child(6)").delay(1000).fadeIn();
      }
      let onEvents = function(){
        $("#menu-icon").css("pointer-events","auto");
      }
      setTimeout(menuShow, 500)
      setTimeout(onEvents, 1700)
    }
    $(this).toggleClass('header__icon__close')
    $(this).toggleClass('header__icon__open')
    $(".three-open-bar").toggleClass('three-close-bar')
  })

  $("#menu-lists li").on('mouseover',function(){
    $("#header-explain").show()
    $("#header-explain p").hide()
    $("#header-explain").toggleClass('hover')
    let headerId =$(this).attr("id")
    function headerExplain(headerId){
      $("#" + headerId + "-explain").show()
    }
    headerExplain(headerId)
  })
  $("#menu-lists li").on('mouseleave',function(){
    $("#header-explain").hide()
    $("#header-explain p").hide()
    $("#header-explain").toggleClass('hover')
  })
})