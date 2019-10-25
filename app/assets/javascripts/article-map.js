if(document.URL.match("map")){
  var map;
  var marker;
  var center = {
    lat: gon.lat, // 緯度
    lng: gon.lng // 経度
  };

  function articleMap() {
    map = new google.maps.Map(document.getElementById('article-map'), { // #sampleに地図を埋め込む
      center: center, // 地図の中心を指定
      zoom: 15 // 地図のズームを指定
    });
    
    marker = new google.maps.Marker({ // マーカーの追加
      position: center, // マーカーを立てる位置を指定
      map: map // マーカーを立てる地図を指定
    });
  }
}