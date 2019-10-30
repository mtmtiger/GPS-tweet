$(document).on("turbolinks:load",function() {
  $(function(){
    $(document).on('mousemove', "#mouse-offset", function(e){
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

    
    $(document).on('mouseout', "#article-index-list a div:last-child", function(){
      $(this).parent().parent().css({transform: 'rotateX(0) rotateY(0)'})
      $(this).parent().find("#index-list-image").children().css({"top": "50%", "left": "50%"})
    })

    $(document).on('click',".icon-search", function(){
      $("#articles-input-search").focus()
      if($(this).attr('class') == 'icon-search'){
        $(this).toggleClass('active');
        $("#articles-input-search").animate({width: "300px"}, 500)
        $("#articles-index-title").animate({left: "35%"}, 500)
      }
    })

    $(document).on('click',".icon-search.active", function(){
      $("#articles-input-search").blur()
      $(this).toggleClass('active');
      $("#articles-input-search").animate({width: "0"}, 500)
      $("#articles-index-title").animate({left: "50%"}, 500)
    })

    function articleHit(article){
      let html = `<div class="articles-index__box__main__container">
                  <div class="articles-index__box__main__container__list" id="article-index-list" style="transform: rotateX(0deg) rotateY(0deg);">
                  <a data-turbolinks="false" href="/articles/${article.id}"><div class="articles-index__box__main__container__list__image" id="index-list-image">
                  <img ${article.image}" style="top: 50%; left: 50%;">
                  </div>
                  <div class="articles-index__box__main__container__list__inset-border"></div>
                  <div class="articles-index__box__main__container__list__date">
                  <div class="icon-calender"></div>
                  <div class="articles-index__box__main__container__list__date__text">
                  ${article.created_at}
                  </div>
                  </div>
                  <div class="articles-index__box__main__container__list__nice">
                  <div class="icon-heart"></div>
                  <div class="articles-index__box__main__container__list__nice__count">
                  ${article.nices}
                  </div>
                  </div>
                  <div class="articles-index__box__main__container__list__title">
                  ${article.title}
                  </div>
                  <span class="articles-index__box__main__container__list__line"></span>
                  <div class="articles-index__box__main__container__list__user-name">
                  ${article.user}
                  </div>
                  <div class="articles-index__box__main__container__list__text">
                  ${article.text}
                  </div>
                  <div class="articles-index__box__main__container__list__wrap" id="mouse-offset"></div>
                  </a></div>
                  </div>`
      $(".articles-index__box__main").append(html)
    }
    $("#articles-input-search").on('keyup', function(){
      let input = $("#articles-input-search").val()
      $.ajax({
        type: 'GET',
        url: '/articles/search',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(articles){
        $(".articles-index__box__main").empty()
        if (articles.length !== 0) {
          articles.forEach(function(article) {
            articleHit(article);
          });
        }
      })
      .fail(function(){
      })
    })
  })
})