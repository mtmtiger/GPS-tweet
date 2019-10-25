
  var map;
  var marker;
  let btnHTML = `<button class="new-article__box__left__bottom__btn" id="map-decision" type="button">
  座標を決定
  </button>`
  
  function initMap() {
    var center = {
      lat: 35.681236,
      lng: 139.764936
    }
    map = new google.maps.Map(document.getElementById('map'), { // #sampleに地図を埋め込む
      center: center, // 地図の中心を指定
      zoom: 6 // 地図のズームを指定
    });
    marker = new google.maps.Marker({ // マーカーの追加
      // position: center, // マーカーを立てる位置を指定
      // map: map // マーカーを立てる地図を指定
    });
          map.addListener('click', function(e) {
            getClickLatLng(e.latLng, map);

            // ボタンの表示判定
            if($("#lat").val() != ""){
              if($("#article-map-bottom").children('button').size()){
                $("#article-map-bottom").children('button').remove()
              }
              $("#article-map-bottom").append(btnHTML)
            }

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
          
          // ボタンの表示判定
          if($("#lat").val() != ""){
            if($("#article-map-bottom").children('button').size()){
              $("#article-map-bottom").children('button').remove()
            }
            $("#article-map-bottom").append(btnHTML)
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
