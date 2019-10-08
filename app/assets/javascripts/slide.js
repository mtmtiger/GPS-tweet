$(function(){
  // 画像の枚数
  let count = $("#slide li").length;
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
    $("#slide li:nth-child(" + current + ")").stop().fadeOut(duration);
    $("#slide li:nth-child(" + next + ")").stop().fadeIn(duration);
    current = next;
    next = ++next;
    if(next > count){
      next = 1
    }
    $("#button li a").removeClass("target")
    $("#button li:nth-child(" + current + ") a").addClass("target")
  }

  $("#button li a").click(function(){
    next = $(this).html();

    clearInterval(timer);
    timer = setInterval(slideTimer, interval);
    
    slideTimer();

    return false;
  })
  $(document).on('click', "#slide li", function(){
    clearInterval(timer);
    timer = setInterval(slideTimer, interval);
    slideTimer();
  })
});