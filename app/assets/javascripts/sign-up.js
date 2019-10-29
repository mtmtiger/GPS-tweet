$(document).on("turbolinks:load",function() {
  $(document).on('click', "#log-in-tab li", function(){
    $("#log-in-tab li").removeClass("active")
    $(this).addClass("active")
    if($(this).attr("id") == "log-in-menu"){
      $("#sign-up-view").hide()
      $("#log-in-view").show()
      $("#test-user-email").val("test@user")
      $("#test-user-password").val("testuser1")
    }
    else if($(this).attr("id") == "sign-up-menu"){
      $("#log-in-view").hide()
      $("#sign-up-view").show()
    }
  })
})