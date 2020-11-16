// USGS Past 7 Days - updated every minute from: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create function for circle color based on depth
function eqDepthColor(depth) {
  if (depth < 10) { return "#A3F600" }
  else if (depth >= 10 && depth < 30) { return "#DBF400" }
  else if (depth >= 30 && depth < 50) { return "#F7DB11" }
  else if (depth >= 50 && depth < 70) { return "#FDB72A" }
  else if (depth >= 70 && depth < 90) { return "#FCA35D" }
  else { return "#FF5F65"}
}

// Create function for circle size based on magnitude
function eqRadius(magnitude) {
    return magnitude * 30000;
}

// Use D3 to read the data
d3.json(queryUrl, data => {
  // Send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  // Give each feature a popup describing the place, time, magnitude, and depth of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h4>" + feature.properties.place +
      "</h4><hr>" + "<b><u>Time</u>: </b>"+ new Date(feature.properties.time) + "<br>" + "<b><u>Magnitude</u>: </b>" + feature.properties.mag + "<br>" + "<b><u>Depth</u>: </b>" + feature.geometry.coordinates[2]);
  }
  
  // Create a GeoJSON layer containing the features array on the earthquakeData object and run the onEachFeature function once for each piece of data in the array
  // https://leafletjs.com/reference-1.7.1.html#circle
  // https://leafletjs.com/reference-1.7.1.html#layer
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (earthquakeData, latlng) {
        return L.circle(latlng, {
            radius: eqRadius(earthquakeData.properties.mag),
            fillColor: eqDepthColor(earthquakeData.geometry.coordinates[2]),
            fillOpacity: .8,
            weight: .3,
            color: "#000"
        });
    },
    onEachFeature: onEachFeature
  });
  // Send earthquakes layer to the createMap function
  createMap(earthquakes);
}

// Create function to render map and layers
function createMap(earthquakes) {

  // Define layers
  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "satellite-streets-v11",
  accessToken: API_KEY
});

  var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "outdoors-v11",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold base layers
  var baseMaps = {
    "Satellite": satellite,
    "Light": light,
    "Outdoors": outdoors
  };

  // Create overlay object to hold overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create the map, giving it the satellite and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [39.8283, -98.5795],
    zoom: 3.5,
    layers: [satellite, earthquakes]
  });

  // Create a layer control and pass in baseMaps and overlayMaps then add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

 // Add legend to the map - NOTE: further styling is in CSS
 // https://leafletjs.com/examples/choropleth/
  var legend = L.control({position: 'bottomright'});
    
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
    depths = [0, 10, 30, 50, 70, 90],
    labels = ["<h1>Earthquake Depth(km)</h1>"];

  // Create legend 
  for (var i = 0; i < depths.length; i++) {
    labels.push(
        '<li style="background:' + eqDepthColor(depths[i] + 1) + '">' +
        depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1]: '+') + '</li>');
  }
  div.innerHTML = labels.join('');
  return div;
  };
  legend.addTo(myMap);
}
