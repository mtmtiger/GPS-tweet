$(document).on("turbolinks:load",function() {
  $("#tab-list li").on('click', function(){
    $("#tab-list li").removeClass("active")
    $(this).addClass("active")
    function waveAnime(leftPosition){
      $("#tab-top").stop()
      $("#tab-top").animate({"left": leftPosition}, 400, 'swing')
    }
    if($(this).attr("id") == "user-articles") {
      $("#tab-views").children().hide()
      $("#slide-lists").show()
      waveAnime("0%");
    } else if($(this).attr("id") == "nice-users") {
      $("#tab-views").children().hide()
      $("#nices-box").show()
      waveAnime("25%");
    } else if($(this).attr("id") == "following-users") {
      $("#tab-views").children().hide()
      $("#following-box").show()
      waveAnime("50%")
    } else if($(this).attr("id") == "followers-users") {
      $("#tab-views").children().hide()
      $("#followers-box").show()
      waveAnime("75%")
    }
  })

  $(".nice-btn").on('click', function(){
    if($(this).attr("class") == "nice-btn active"){
      $(this).removeClass("active")
    } else {
      $(this).addClass("active")
    }
  })

  $(".user-box__follow__articles-link").on('click',function(e){
    e.preventDefault()
    $("#user-articles").trigger('click')
  })
  $(".user-box__follow__nices-link").on('click',function(e){
    e.preventDefault()
    $("#nice-users").trigger('click')
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