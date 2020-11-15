// Create an initial map object
// Set the longitude, latitude, and the starting zoom level
// var myMap = L.map("map").setView([39.8283, -98.5795], 4);


// light-v10


// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // function eqDepthColor(depth) {
  //   if (depth < 10) { return "#71D628" }
  //   else if (depth >= 10 && depth < 30) { return "#FFFF33" }
  //   else if (depth >= 30 && depth < 50) { return "#FFCC33" }
  //   else if (depth >= 50 && depth < 70) { return "#FF9933" }
  //   else if (depth >= 70 && depth < 90) { return "#FF6633" }
  //   else { return "#FF3333"}
  // }

  // function eqRadius(magnitude) {
  //     return magnitude * 20000;
  // }
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  // https://leafletjs.com/reference-1.7.1.html#circle
  // https://leafletjs.com/reference-1.7.1.html#layer
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (earthquakeData, latlng) {
        return L.circle(latlng, {
            radius: eqRadius(earthquakeData.properties.mag),
            fillColor: eqDepthColor(earthquakeData.geometry.coordinates[2]),
            fillOpacity: .9,
            weight: 1,
            color: "#000"
        });
    },
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });

  var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "outdoors-v11",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Satellite": satellite,
    "Outdoors": outdoors
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [39.8283, -98.5795],
    zoom: 4,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

 // Add legend to the map
 // https://leafletjs.com/examples/choropleth/
  var legend = L.control({position: 'bottomright'});
    
  legend.onAdd = function(myMap) {
    var div = L.DomUtil.create("div", "info legend"),
    grades = [0, 10, 30, 50, 70, 90],
    labels = [];

  // Create legend
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
        '<i style="background:' + eqDepthColor(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
  return div;
  };
  legend.addTo(myMap);

}

function eqDepthColor(depth) {
  if (depth < 10) { return "#71D628" }
  else if (depth >= 10 && depth < 30) { return "#FFFF33" }
  else if (depth >= 30 && depth < 50) { return "#FFCC33" }
  else if (depth >= 50 && depth < 70) { return "#FF9933" }
  else if (depth >= 70 && depth < 90) { return "#FF6633" }
  else { return "#FF3333"}
}

function eqRadius(magnitude) {
    return magnitude * 20000;
}
