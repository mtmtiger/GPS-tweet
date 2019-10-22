$(document).on("turbolinks:load",function() {
  $("#article-index-list a div:last-child").on('mousemove', function(e){
    let divX = e.offsetX
    let divY = e.offsetY
    let centerX = $(this).width() * 0.5
    let centerY = $(this).height() * 0.5
    let mouseX = divX - ($(this).width() * 0.5)
    let mouseY = ($(this).height() * 0.5) - divY
    let angleX = mouseX / centerX * 20
    let angleY = mouseY / centerY * 10
    let imgPositionTop = 50
    let imgPositionLeft = 50
    let rotatePositionTop = imgPositionTop + angleY
    let rotatePositionLeft = imgPositionLeft - angleX / 2
    let rotateX = angleY + "deg"
    let rotateY = angleX + "deg"
    $(this).parent().parent().css("transform", "rotateX( "+ rotateX + ") " + "rotateY(" + rotateY + ")")
    $(this).parent().find("#index-list-image").children().css({"top": rotatePositionTop + "%", "left": rotatePositionLeft + "%"})
  })

  
  $("#article-index-list a div:last-child").on('mouseout',function(){
    $(this).parent().parent().css({transform: 'rotateX(0) rotateY(0)'})
    $(this).parent().find("#index-list-image").children().css({"top": "50%", "left": "50%"})
  })
})