var MapController = function(applicationController,latitude, longitude){
  this.latitude = latitude
  this.longitude = longitude
  this.parent = applicationController
  this.placeObject
};

MapController.prototype = {
  initMap: function() {
    var mapDiv = document.getElementById('map');

    if (typeof(this.placeObject) === "object"){
      this.latitude = Number(this.placeObject.latitude);
      this.longitude = Number(this.placeObject.longitude);
    };

    var venueLocation = {lat: this.latitude, lng: this.longitude}
    var map = new google.maps.Map(mapDiv, {
      center: venueLocation,
      zoom: 15
    });

    var infowindow = new google.maps.InfoWindow({
      content: this.contentBuilder()
    });

    var marker = new google.maps.Marker({
      position: venueLocation,
      map: map
    });

    infowindow.open(map, marker);

    marker.addListener('click', function(){
      infowindow.open(map, marker);
    });

  },

  contentBuilder: function(){
    if (typeof(this.placeObject) === "object"){
      return this.fullContentWindow();
    } else {
      return this.standardContentWindow();
    };
  },

  standardContentWindow: function(){
    var googleMapsNavigateBase = "http://maps.google.com/maps?z=12&t=m&q="
    var locationQuery = "loc:" + this.latitude.toString() + "+" + this.longitude.toString();
    var fullURL= googleMapsNavigateBase + locationQuery;
    var showInGoogle = "<h5><a href=" + fullURL + ">Show in google</a></h5>"
    return showInGoogle;
  },

  fullContentWindow: function(){
    var htmlArray = [];
    htmlArray.push("<p>address: " + this.placeObject.address + "</p>");
    htmlArray.push("<p>phone: " + this.placeObject.phone + "</p>");
    htmlArray.push("<p><a href=" + this.placeObject.google_url + ">view on google</p>");
    return htmlArray.join("");
  }
};
