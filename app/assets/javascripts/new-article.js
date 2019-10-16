$(document).on("turbolinks:load",function() {
  $(function(){
    $fileField = $("#article_images")
    files_array = []
    old_array = []

    if(document.URL.match("items" && "edit")){
      old_array = gon.img_array
    }

    $($fileField).on('change', $fileField, function(e) {
        files = e.target.files
        for (var i=0; i<files.length; i++) {
          if(old_array != null) {
            if (files_array.length >= 3 - old_array.length){
              break
            }
          }
        files_array.push(files[i])

        reader = new FileReader(),
        $previewBox = $("#preview_box");
        $previewList = $("#preview_list");
        if (old_array.length + files_array.length <= 3){

            reader.onload = (function(e){
              let imgURI = e.target.result
              let preview =  `<li class="upload-article">
                                <figure class="upload-article-figure">
                                  <img src="${imgURI}">
                                </figure>
                                <div class="upload-article-btn">
                                  <a class="upload-article-delete" href="/">取消</a>
                                </div>
                              </li>`

              $previewList.append(preview)
            });
            
          reader.readAsDataURL(files[i]);
        } 
      }
    }) 

    $(document).on('click','#preview_box .upload-article-delete', function(e){
      e.preventDefault();
      var index = $("#preview_box .upload-article-delete").index(this);
      if(document.URL.match("items" && "edit")){
        var num = $(this).parent().parent().attr('id');
        if(num != undefined){
        num_array.push(num)
        }
      }
      if(index <= old_array.length -1){
      old_array.splice(index, 1);
      } else {
      files_array.splice(index - old_array.length, 1);
      }
      $(this).parent().parent().remove();
    });

    $("#form_with").on('submit', function(e){
      e.preventDefault();
      var formData = new FormData($(this).get(0));
      files_array.forEach(function(file){
        formData.append("new_images[images][]", file)
      })
      $.ajax ({
        url: '/articles',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
      })
      .done(function(val){
      })
      .fail(function(val){
        alert('登録できませんでした')
        location.reload();
      })
    })

    $("#form_with_edit").on('submit', function(e){
      e.preventDefault();
      var formData = new FormData($(this).get(0));
      let id = gon.item.id

      files_array.forEach(function(file){
        formData.append("new_images[images][]", file)
      })
      num_array.forEach(function(file){
        formData.append("new_images[num][]", file)
      })

      if (num_array.length == 0 || files_array.length == 0){
        kara_array = ["1"]
        kara_array.forEach(function(file){
          formData.append("new_images[kara][]", file)
        })
      }
      if(files_array.length != 0 || old_array.length != 0){
        $.ajax ({
          url: '/articles/' + id,
          type: 'PUT',
          data: formData,
          contentType: false,
          processData: false,
        })
        .done(function(val){
        })
        .fail(function(val){
          alert("画像を変更してください")
        })
      } else {
        alert("画像が一枚もありません")
        window.location.reload();
      }
    })
  })
  $('#article-images').on('dragover',function(e){
    e.preventDefault();
  });
  $('#article-images').on('drop',function(event){
    event.preventDefault();
    files = event.originalEvent.dataTransfer.files;
    for (var i=0; i<files.length; i++) {
      if(old_array != null) {
        if (files_array.length >= 3 - old_array.length){
          break
        }
      }
    files_array.push(files[i])

    reader = new FileReader(),
    $previewBox = $("#preview_box");
    $previewList = $("#preview_list");
    if (old_array.length + files_array.length <= 3){

        reader.onload = (function(e){
          let imgURI = e.target.result
          let preview =  `<li class="upload-article">
                            <figure class="upload-article-figure">
                              <img src="${imgURI}">
                            </figure>
                            <div class="upload-article-btn">
                              <a class="upload-article-delete" href="/">取消</a>
                            </div>
                          </li>`

          $previewList.append(preview)
        });
        
      reader.readAsDataURL(files[i]);
      } 
    }
  }) 
})

