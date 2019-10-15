$(document).on("turbolinks:load",function() {
  $(function(){
    if(document.URL.match("users")){
      $("#users-list").animate({opacity: 1}, 500,'swing')
    }
  })
})