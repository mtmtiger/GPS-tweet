$(document).on("turbolinks:load",function() {
  $(function(){
    $fileField = $("#user_image")

    $($fileField).on('change', $fileField, function(e) {
      $("#preview_list").children().remove()
      files = e.target.files

      reader = new FileReader(),
      $previewList = $("#preview_list");
        reader.onload = (function(e){
          let imgURI = e.target.result
          let preview =  `<li class="upload-user">
                            <figure class="upload-user-figure">
                              <img src="${imgURI}">
                            </figure>
                          </li>`
          $previewList.append(preview)
        });
      reader.readAsDataURL(files[0]);
    })
    
    $(".user-edit-reset-btn").on('click', function(){
      $("#preview_list").children().remove()
    })
  })
})
