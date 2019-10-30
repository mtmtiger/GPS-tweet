$(document).on("turbolinks:load",function() {
  let current = 0
  $(document).on('click', "#introduction-next", function(){
    $(this).css("pointer-events","none");
    if(current == 0) {
      $("#introduction-lists").animate({left: "-100%"}, 500, function(){
        $("#introduction-next").css("pointer-events","auto");
        $("#introduction-prev").css("pointer-events","auto");
      })
      $(".introduction-btn__prev").animate({opacity: "1"}, 500)
      current += 1
    } else if(current == 1) {
      $("#introduction-lists").animate({left: "-200%"}, 500, function(){
        $("#introduction-next").css("pointer-events","auto");
        $("#introduction-prev").css("pointer-events","auto");
      })
      $(this).animate({opacity: "0"}, 500)
      current += 1
    }
  })

  $(document).on('click', "#introduction-prev", function(){
    $(this).css("pointer-events","none");
    if(current == 1){
      $("#introduction-lists").animate({left: "0"}, 500, function(){
        $("#introduction-next").css("pointer-events","auto");
        $("#introduction-prev").css("pointer-events","auto");
      })
      $(".introduction-btn__prev").animate({opacity: "0"}, 500)
      current -= 1
    } else if(current == 2) {
      $("#introduction-lists").animate({left: "-100%"}, 500, function(){
        $("#introduction-next").css("pointer-events","auto");
        $("#introduction-prev").css("pointer-events","auto");
      })
      $("#introduction-next").animate({opacity: "1"}, 500)
      current -= 1
    }
  })
})