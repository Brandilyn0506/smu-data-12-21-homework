
$(document).ready(function() {
    Work();

   });

function Work() {
    var url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson`;
    var url2 = `static/data/PB2002_boundaries.json`
    getAjax(url,url2);


    
}

function getAjax(url, url2) {
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            //Nested request
            $.ajax({
                type: "GET",
                url: url2,
                contentType: "application/json",
                dataType: "json",
                success: function (plate_info) {
                    console.log(data);
                    console.log(plate_info);
                    makeMap(data, plate_info);
                },
                error: function(data) {
                    console.log("it's broken");
                
                },

                complete: function(data) {
                    console.log("it's finished");
                }
            });
                        
        },
        error: function(textStatus, errorThrown) {
            console.log("FAILED to get data");
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function onEachFeature(feature, layer) {
    if (feature.properties) {
        layer.bindPopup(`<h3>${ feature.properties.title } at depth: ${feature.geometry.coordinates[2].toFixed(0)}m</h3><hr><p>${new Date(feature.properties.time)}</p >`);
    }
}


// Make Map

function makeMap(data, plate_info) {


    // apply the filter
    var earthquakes = data.features
    // Create the base layers.
    
    var dark_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10',
        accessToken: API_KEY
    });

    var light_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v10',
        accessToken: API_KEY
    });

    var street_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        accessToken: API_KEY
    });

    var outdoors_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/outdoors-v11',
        accessToken: API_KEY
    });


    // Create an overlays object.
    var earthquakeLayer = L.geoJSON(earthquakes, {
        onEachFeature: onEachFeature
    });

    //plate
    var plate = L.geoJson(plate_info.features, {
        style: {
            "color": "orange",
            "weight" : 1,
            "opacity" : .8
        }
    });

    //Cirlcle layer

    var circles = [];
    for (let i=0; i< earthquakes.length; i++) {
        let earthquake = earthquakes[i];
        let circle_color = "green";
        let magnitude = earthquake.properties.mag;
        let coord = earthquake.geometry.coordinates[2];

        let location = [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]]

        let circle = L.circle(location, {
            color: getColor(coord),
            fillColor: getColor(coord),
            fillOpacity: 0.6,
            radius: getRadius(magnitude)
        }) .bindPopup (`<h3>${ earthquake.properties.title } at depth: ${earthquake.geometry.coordinates[2].toFixed(0)}m</h3><hr><p>${new Date(earthquake.properties.time)}</p>`);
        circles.push(circle);
    }

    var circleLayer = L.layerGroup(circles);

    // baseMaps object.
    var baseMaps = {
        "Dark": dark_layer,
        "Light": light_layer,
        "Street": street_layer,
        "Outdoors": outdoors_layer
    };

    // Overlays that can be toggled on or off
    var overlayMaps = {
        Markers: earthquakeLayer,
        Circles: circleLayer,
        Plates: plate
    };

    // Create a new map.
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [dark_layer,circleLayer, plate]
    });
    //control layer
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    //legend
    var legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function() {
        var div = L.DomUtil.create('div', 'info legend');
        var labels = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
        var colors = ["green", "yellow", "gold", "orange", "darkorange","red"];

        for (let i = 0; i < labels.length; i++) {
            let label = labels[i];
            let color = colors[i];

            let html = `<i style='background:${color}'></i>${label}<br>`;
            div.innerHTML += html;
        }
        return div;
    }

    legend.addTo(myMap);
}


function getRadius(magnitude){
    return magnitude * 50000
}

function getColor(depth) {
    let color = 'red';

    if (depth >= 90) {
        color = "red";
    } else if (depth >= 70) {
        color = "darkorange";
    } else if (depth >= 50) {
        color = "orange";
    } else if (depth >= 30) {
        color = "gold";
    } else if (depth >= 10) {
        color = "yellow";
    } else {
        color = 'green';
    }

    return (color);

}