// List of providers
var osmMap = L.tileLayer.provider("OpenStreetMap.Mapnik");
var stamenMap = L.tileLayer.provider("Stamen.Watercolor");
var imageryMap = L.tileLayer.provider("Esri.WorldImagery");

// Adding providers to a base map
var baseMaps = {
  "Open Street Map": osmMap,
  "Stamen Watercolor": stamenMap,
  "World Imagery": imageryMap,
};

// Defining map center
var map = L.map("map", {
  // center: [22.735656, 79.892578],
  // zoom: 5,
  center: [0.721645, 32.013793],
  zoom: 5,
  //layers: [osmMap, indStateLayer]
  zoomControl: false,
  layers: [osmMap],
});
map.attributionControl.setPrefix('<strong>&copy; Copyright 2023 KMFRI</strong>');
L.control
  .zoom({
    position: "bottomright",
  })
  .addTo(map);

//Defines popup definitions
function showPopup(feature, layer) {
  layer.bindPopup(makePopup(feature), { closeButton: false });
}

//Customising popup message
function makePopup(feature) {
  return `
            <div>
                <h4>${feature.properties.Name}</h4>
                <p><strong>Level</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${feature.properties.Level}</p>
                <p><strong>Town</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${feature.properties.Town}</p>
                <p><strong>Plastic</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${feature.properties.Plastic}</p>
                <p><strong>Glass</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${feature.properties.Glass}</p>
                <p><strong>Paper</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${feature.properties.Paper}</p>
                <p><strong>Metal</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${feature.properties.Metal}</p>
                <div class="phone-number">
                <a href="tel:${feature.properties.Phone}"><strong>+${feature.properties.Phone}</strong></a>
                </div>
            </div> &nbsp;
    `;
}

// //Passing Filter string
// var StringFilter1 = new RegExp("Kwale", "g");
var country_Data;
// //Load the data from database geojson
// var country_Data1 = L.geoJSON(data, {
//   onEachFeature: showPopup,
//   filter: function (feature, latlon) {
//     if (feature.properties.County.match(StringFilter1)) {
//       return true;
//     }
//   },
// });

//Load geojson on map reload
var myData = L.layerGroup([]);

country_Data = L.geoJSON(countryData, {
  style: function (feature) {
    return {
      color: "black",
      fillOpacity: 0,
    };
  },
  filter: function (feature, latlon) {
        return true;
    
  },
  center: [0.721645, 32.013793],
  zoom: 5,
});

myData.addLayer(country_Data);

//Load markers on map reload

var player_Data = L.geoJSON(data, {
  onEachFeature: showPopup,
});

 //Using a Layer Group to add/ remove data from the map.
//  var markers = L.markerClusterGroup();
//  markers.addLayer(player_Data);
 myData.addLayer(player_Data);
 myData.addTo(map);

var overlayMaps = {
 // Region: country_Data,
};

// Adding the defined providers above to map
var mapLayer = L.control.layers(baseMaps, overlayMaps).addTo(map);

//!=======================================================Dashboard 1 Event handlers=======================================================

var lis = document.getElementById("dashboard_1").getElementsByTagName("a");

for (var i = 0; i < lis.length; i++) {
  lis[i].addEventListener("click", Get_County_to_Focus, false);
}

function Get_County_to_Focus() {
  myData.clearLayers();

  //Storing the selected county
  var x = this.innerHTML;

  //Selects the selected county coordinate
  switch (x) {
    case "Tana River":
      map.flyTo([-1.443742, 39.493928], 8);
      break;
    case "Mombasa":
      map.flyTo([-3.99613, 39.669188], 12);
      break;
    case "Taita Taveta":
      map.flyTo([-3.557384, 38.426154], 9);
      break;
    case "Kilifi":
      map.flyTo([-3.531675, 39.89235], 9);
      break;
    case "Lamu":
      map.flyTo([-2.039467, 40.812881], 10);
      break;
    case "Kwale":
      map.flyTo([-4.176995, 39.458897], 9);
      break;
    default:
      map.flyTo([-3.973658, 39.109089], 8);
  }

  //Passing Filter string
  var StringFilter = new RegExp(x, "g");

  //Adding country geoJSON layer to the map
  country_Data = L.geoJSON(countryData, {
    style: function (feature) {
      return {
        color: "black",
        fillOpacity: 0,
      };
    },
    filter: function (feature, latlon) {
      if (x === "All Counties") {
        return true;
      } else {
        if (feature.properties.ADM1_EN.match(StringFilter)) {
          return true;
        }
      }
    },
    center: [0.721645, 32.013793],
    zoom: 5,
  });

  myData.addLayer(country_Data);

  //!Load the database from database geojson
  var player_Data = L.geoJSON(data, {
    onEachFeature: showPopup,
    filter: function (feature, latlon) {
      if (x === "All Counties"|| x===null) {
        return true;
      } else {
        if (feature.properties.County.match(StringFilter)) {
          return true;
        }
      }
    },
  });

  //Using a Layer Group to add/ remove data from the map.
  var markers = L.markerClusterGroup();
  markers.addLayer(player_Data);
  myData.addLayer(markers);
  myData.addTo(map);
}
//!=======================================================Dashboard 1 Event handlers=======================================================

var lis = document.getElementById("dashboard_2").getElementsByTagName("a");

for (var i = 0; i < lis.length; i++) {
  lis[i].addEventListener("click", Get_Waste_to_Focus, false);
}

function Get_Waste_to_Focus() {
  myData.clearLayers();

  //Storing the selected county
  var x = this.innerHTML;

  //Selects the selected county coordinate
  switch (x) {
    case "Buyer":
      //Defines Icons
      var myIcon = L.icon({
        iconUrl: "resources/icons/blue_marker.png",
        iconSize: [40, 40],
      });
      map.flyTo([-3.973658, 39.109089], 8);
      break;
    case "Recycler":
      //Defines Icons
      var myIcon = L.icon({
        iconUrl: "resources/icons/green_marker.png",
        iconSize: [40, 40],
      });
      map.flyTo([-3.973658, 39.109089], 8);
      break;
    case "Collector":
      //Defines Icons
      var myIcon = L.icon({
        iconUrl: "resources/icons/red_marker.png",
        iconSize: [40, 40],
      });
      map.flyTo([-3.973658, 39.109089], 8);
      break;

    default:
      //Defines Icons
      var myIcon = L.icon({
        iconUrl: "resources/icons/red_marker.png",
        iconSize: [40, 40],
      });
      map.flyTo([-3.973658, 39.109089], 8);
  }

  //Passing Filter string
  var StringFilter = new RegExp(x, "g");

  //Adding country geoJSON layer to the map
  country_Data = L.geoJSON(countryData, {
    style: function (feature) {
      return {
        color: "black",
        fillOpacity: 0,
      };
    },
    onEachFeature(feature, layer) {
      layer.on('mouseover', function () {
        this.setStyle({
          color: '#da624a',
          fillOpacity: 0.5,
        });
      });
      layer.on('mouseout', function () {
        this.setStyle({
          color: "black",
         fillOpacity: 0,
        });
      });

      layer.bindTooltip(feature.properties.ADM2_EN+"&nbsp;Sub County", {closeButton: false, offset: L.point(0, -20)});
  },
    
  });
  // .bindPopup(function (layer){
  //   return `<h4 style="padding: 20px;"><strong>${layer.feature.properties.ADM2_EN}</strong> Sub County</h4>`;
  // });

  myData.addLayer(country_Data);

  //!Load the database from database geojson
  var player_Data = L.geoJSON(data, {
    onEachFeature: showPopup,
    pointToLayer: function (feature, latlon) {
      return L.marker(latlon, { icon: myIcon });
    },
    filter: function (feature, latlon) {
      if (x === "All Waste Players") {
        return true;
      } else {
        if (feature.properties.Level.match(StringFilter)) {
          return true;
        }
      }
    },
  });

  //Using a Layer Group to add/ remove data from the map.
  var markers = L.markerClusterGroup();
  markers.addLayer(player_Data);
  myData.addLayer(markers);
  myData.addTo(map);
}

//!=======================================================Dashboard 2 Event handlers=======================================================

var lis = document.getElementById("dashboard_3").getElementsByTagName("a");

for (var i = 0; i < lis.length; i++) {
  lis[i].addEventListener("click", Get_Categories_to_Focus, false);
}

function Get_Categories_to_Focus() {
  myData.clearLayers();

  //Storing the selected county
  var x = this.innerHTML;

  //Selects the selected county coordinate
  switch (x) {
    default:
      map.flyTo([-3.973658, 39.109089], 8);
  }

  //Adding country geoJSON layer to the map
  country_Data = L.geoJSON(countryData, {
    style: function (feature) {
      return {
        color: "black",
        fillOpacity: 0,
      };
    },
    center: [0.721645, 32.013793],
    zoom: 5,
  });

  myData.addLayer(country_Data);

  //!Load the database from database geojson
  var player_Data = L.geoJSON(data, {
    onEachFeature: showPopup,
    filter: function (feature, latlon) {
      switch (x) {
        case "Plastic":
          if (feature.properties.Plastic != null) {
            return true;
          }
          break;
        case "Glass":
          if (feature.properties.Glass != null) {
            return true;
          }
          break;
        case "Paper":
          if (feature.properties.Paper != null) {
            return true;
          }
          break;
        case "Metal":
          if (feature.properties.Metal != null) {
            return true;
          }
          break;
        case "Rubber":
          if (feature.properties.Rubber != null) {
            return true;
          }
          break;
        case "E-Waste":
          if (feature.properties.E - Waste != null) {
            return true;
          }
          break;
        case "Foam":
          if (feature.properties.Foam != null) {
            return true;
          }
          break;
        case "Organic":
          if (feature.properties.Organic != null) {
            return true;
          }
          break;
        case "Other":
          if (feature.properties.Other != null) {
            return true;
          }
          break;
        default:
          return true;
      }
    },
  });

  //Using a Layer Group to add/ remove data from the map.
  var markers = L.markerClusterGroup();
  markers.addLayer(player_Data);
  myData.addLayer(markers);
  myData.addTo(map);
}

//!=============================================================Group Layer================================================================
