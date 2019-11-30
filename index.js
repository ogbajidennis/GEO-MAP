function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
    var input = document.getElementById('searchInput');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
  
    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });
  
    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
  
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    
        var address = '';
        if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
    
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
      
        //Location details
        for (var i = 0; i < place.address_components.length; i++) {
            if(place.address_components[i].types[0] == 'postal_code'){
                document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
            }
            if(place.address_components[i].types[0] == 'country'){
                document.getElementById('country').innerHTML = place.address_components[i].long_name;
            }
        }
        document.getElementById('location').innerHTML = place.formatted_address;
        var latitude =  place.geometry.location.lat();
        var longitude = place.geometry.location.lng();

        
      //Get Weather
      document.getElementById('showWeather').addEventListener('click', getWeather);

      function getWeather () {
          var api = ' https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=78c41b3ef7b008eb035fd1e2cfa87696';

          fetch(api)
         .then((res) => res.json())
         .then((data) => {
            
            var windSpeed = data.wind.speed;
            var Temperature = data.main.temp; 
            var weather = data.weather[0].description;
            var humidity = data.main.humidity;

            //Posts to the DOM
            document.getElementById('wind').innerHTML = windSpeed + "km/hr";
            document.getElementById('temp').innerHTML = Temperature + '&deg';
            document.getElementById('weather').innerHTML = weather;
            document.getElementById('humidity').innerHTML = humidity;
      })
      }
    });
 ft-temperature-converter-29666918
}

// Temperature Converters

document.getElementById('celsius').addEventListener('click', convertToCelsius);
document.getElementById('farenheit').addEventListener('click', convertToFarenheit);

function convertToCelsius () {
    var celsiusTemp = temp.textContent;
    var celsiusTemperature = Math.round(parseFloat(celsiusTemp) - 273.15);
    document.getElementById('celsiusContent').innerHTML = celsiusTemperature + '&deg' + 'C';
}

function convertToFarenheit () {
    var fahrenheitTemp = temp.textContent;
    var fahrenheitTemperature = Math.round(((parseFloat(fahrenheitTemp)-273.15)*1.8)+32);
    document.getElementById('farenheitContent').innerHTML = fahrenheitTemperature + '&deg' + 'F';
}

  
  
  // Temperature Converters
  
  document.getElementById('celsius').addEventListener('click', convertToCelsius);
  document.getElementById('farenheit').addEventListener('click', convertToFarenheit);
  
  function convertToCelsius () {
      var celsiusTemp = temp.textContent;
      var celsiusTemperature = Math.round(parseFloat(celsiusTemp) - 273.15);
      document.getElementById('celsiusContent').innerHTML = celsiusTemperature + '&deg' + 'C';
  }
  
  function convertToFarenheit () {
      var fahrenheitTemp = temp.textContent;
      var fahrenheitTemperature = Math.round(((parseFloat(fahrenheitTemp)-273.15)*1.8)+32);
      document.getElementById('farenheitContent').innerHTML = fahrenheitTemperature + '&deg' + 'F';
  }
 develop