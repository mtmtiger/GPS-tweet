$(function(){
  // 画像の枚数
    let count = $("#slide-lists li").length
  // 現在表示されている画像
  let current = 1;
  // 次に表示する画像
  let next = 2;
  // フェードイン／フェードアウトのインターバル(何秒ごとに画像を切り替えるか)
  let interval = 3000;
  // フェードイン／フェードアウトのスピード
  let duration = 500;
  // タイマー用の変数
  let timer;

  timer = setInterval(slideTimer, interval);

  function slideTimer(){
    if(count != 1 || 0){
      $("#slide-list:nth-child(" + current + ")").stop().fadeOut(duration);
      $("#slide-list:nth-child(" + next + ")").stop().fadeIn(duration);
      current = next;
      next = ++next;
      if(next > count){
        next = 1
      }
      $("#user-article-slide-btn a").removeClass("target")
      $("#user-article-slide-btn:nth-child(" + current + ") a").addClass("target")
      }
    }

  $("#user-article-slide-btn a").click(function(){
    next = $(this).html();

    clearInterval(timer);
    timer = setInterval(slideTimer, interval);
    
    slideTimer();

    return false;
  })

  $("#prev-btn").click(function(){
    if(current != 1){
      next = current -1
    } else {
      next = count
    }

    clearInterval(timer);
    timer = setInterval(slideTimer, interval);
    
    slideTimer();

    return false;
  })

  $("#next-btn").click(function(){

    clearInterval(timer);
    timer = setInterval(slideTimer, interval);
    
    slideTimer();

    return false;
  })

  $(document).on('mouseenter', '#slide-list', function(){
    clearInterval(timer);
  });
  $(document).on('mouseleave', '#slide-list', function(){
    timer = setInterval(slideTimer, interval);
  });
})