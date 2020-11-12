// Create an initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map").setView([39.8283, -98.5795], 4);
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  // // USGS API queryUrl
  // var usgsURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

  // d3.json(usgsURL, function(data) {
  //   createFeatures(data.features);
  // });

  // function createFeatures(earthquakeData) {
  //   function onEachFeature(feature, layer) {
  //     layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  //   }

  //   var earthquakes = L.geojson(earthquakeData, {
  //     onEachFeature: onEachFeature
  //   });

  //   createMap(earthquakes);
  // }

  // function createMap(earthquakes) {
  //   var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  //     tileSize: 512,
  //     maxZoom: 18,
  //     zoomOffset: -1,
  //     id: "mapbox/streets-v11",
  //     accessToken: API_KEY
  //   });
  
  //   var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //     maxZoom: 18,
  //     id: "dark-v10",
  //     accessToken: API_KEY
  //   });

  //   var baseMaps = {
  //     "Street Map": streetmap,
  //     "Dark Map": darkmap
  //   };

  //   var overlayMaps = {
  //     Earthquakes: earthquakes
  //   };

  //   var myMap = L.map("map", {
  //     center: [
  //       39.8283, -98.5795
  //     ],
  //     zoom: 4,
  //     layers: [streetmap, earthquakes]
  //   });
  
  //   L.control.layers(baseMaps, overlayMaps, {
  //     collapsed: false
  //   }).addTo(myMap);
  // }
  