if(document.URL.match("articles/new")){
  var map;
  function initMap() {
    // Geolocation APIに対応している
    if (navigator.geolocation) {
      // 現在地を取得
      navigator.geolocation.getCurrentPosition(
        // 取得成功した場合
        function(position) {
          // 緯度・経度を変数に格納
          var mapLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          // マップオプションを変数に格納
          var mapOptions = {
            zoom : 15,          // 拡大倍率
            center : mapLatLng  // 緯度・経度
          };
          // マップオブジェクト作成
          var map = new google.maps.Map(
            document.getElementById("map"), // マップを表示する要素
            mapOptions         // マップオプション
          );
          // マップにマーカーを表示する
          var marker = new google.maps.Marker({
            // map : map,             // 対象の地図オブジェクト
            // position : mapLatLng   // 緯度・経度
          });

          map.addListener('click', function(e) {
            getClickLatLng(e.latLng, map);
          });
          function getClickLatLng(lat_lng, map) {
            
            //☆表示している地図上の緯度経度
            var lat = document.getElementById('lat').value=lat_lng.lat();
            var lng = document.getElementById('lng').value=lat_lng.lng();
            var latlng = new google.maps.LatLng(lat, lng);

            // 緯度・軽度から住所の取得
            var address = new google.maps.Geocoder();
            address.geocode({"latLng":latlng}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
            
                var getAddress = new String(results[0].formatted_address);
                document.getElementById('address').value=getAddress
                //☆表示している地図上の緯度経度
      
              // ジオコーディングが成功しなかった場合
              } else {
                console.log('Geocode was not successful for the following reason: ' + status);
              }
            })

            // マーカーを設置
            marker.setMap(null);
            marker = new google.maps.Marker({
              position: lat_lng,
              map: map
            });
          
            // 座標の中心をずらす
            map.panTo(lat_lng);
          }
        },
        // 取得失敗した場合
        function(error) {
          // エラーメッセージを表示
          switch(error.code) {
            case 1: // PERMISSION_DENIED
              alert("位置情報の利用が許可されていません");
              break;
            case 2: // POSITION_UNAVAILABLE
              alert("現在位置が取得できませんでした");
              break;
            case 3: // TIMEOUT
              alert("タイムアウトになりました");
              break;
            default:
              alert("その他のエラー(エラーコード:"+error.code+")");
              break;
          }
        }
      );
    // Geolocation APIに対応していない
    } else {
      alert("この端末では位置情報が取得できません");
    }
    var getMap = (function(){
      function codeAddress(address) {
        // google.maps.Geocoder()コンストラクタのインスタンスを生成
        var geocoder = new google.maps.Geocoder();
    
        // 地図表示に関するオプション
        var mapOptions = {
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    
        // 地図を表示させるインスタンスを生成
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        
        //マーカー変数用意
        var marker;
        
        // geocoder.geocode()メソッドを実行 
        geocoder.geocode( { 'address': address}, function(results, status) {
          
          // ジオコーディングが成功した場合
          if (status == google.maps.GeocoderStatus.OK) {
            
            // 変換した緯度・経度情報を地図の中心に表示
            map.setCenter(results[0].geometry.location);
            
            //☆表示している地図上の緯度経度
            document.getElementById('lat').value=results[0].geometry.location.lat();
            document.getElementById('lng').value=results[0].geometry.location.lng();
            document.getElementById('address').value=results[0].formatted_address

            // マーカー設定
            marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });

          // ジオコーディングが成功しなかった場合
          } else {
            console.log('Geocode was not successful for the following reason: ' + status);
          }
        
        });
        
        // マップをクリックで位置変更
        map.addListener('click', function(e) {
          getClickLatLng(e.latLng, map);
        });
        function getClickLatLng(lat_lng, map) {
          
          //☆表示している地図上の緯度経度
          document.getElementById('lat').value=lat_lng.lat();
          document.getElementById('lng').value=lat_lng.lng();
            // debugger
          // マーカーを設置
          marker.setMap(null);
          marker = new google.maps.Marker({
            position: lat_lng,
            map: map
          });
        
          // 座標の中心をずらす
          map.panTo(lat_lng);
        }
      
      }
      
      //inputのvalueで検索して地図を表示
      return {
        getAddress: function() {
          // ボタンに指定したid要素を取得
          var button = document.getElementById("map_button");
          
          // ボタンが押された時の処理
          button.onclick = function() {
            // フォームに入力された住所情報を取得
            var address = document.getElementById("search").value;
            // 取得した住所を引数に指定してcodeAddress()関数を実行
            codeAddress(address);
          }
        }
      
      };
    
    })();
    getMap.getAddress();
  }
}