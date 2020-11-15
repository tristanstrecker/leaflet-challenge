// Create an initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("mapid").setView([39.8283, -98.5795], 4);


// light-v10
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Determine color based on depth
function eqDepthColor() {
  // If statements
}

// Perform a GET request to the query URL
d3.json(queryUrl, function(eqData) {
  // Creat GeoJSON layer with retrieved data
  L.geoJson(eqData).addTo(myMap)
  console.log(eqData)



});
