$(document).on("turbolinks:load",function() {
  $("#tab-list li").on('click', function(){
    $("#tab-list li").removeClass("active")
    $(this).addClass("active")
    function waveAnime(leftPosition){
      $("#tab-top").animate({"left": leftPosition}, 400, 'swing')
    }
    if($(this).attr("id") == "user-articles") {
      waveAnime("0%");
    } else if($(this).attr("id") == "nice-users") {
      waveAnime("25%");
    } else if($(this).attr("id") == "following-users") {
      waveAnime("50%")
    } else if($(this).attr("id") == "followers-users") {
      waveAnime("75%")
    }
  })

  $(".nice-btn").on('click', function(e){
    if($(this).attr("class") == "nice-btn active"){
      $(this).removeClass("active")
    } else {
      $(this).addClass("active")
    }
  })

  $(".user-box__follow__following-link").on('click',function(e){
    e.preventDefault()
    $("#following-users").trigger('click')
  })
  $(".user-box__follow__followers-link").on('click',function(e){
    e.preventDefault()
    $("#followers-users").trigger('click')
  })
})