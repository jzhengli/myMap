/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';

	L.Icon.Default.imagePath = 'images/';

	/* create leaflet map */
	var map = L.map('map', {
		center: [35.780402, -78.639078],
		zoom: 13
	});

	/* add default stamen tile layer */
	// new L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
	// 	minZoom: 0,
	// 	maxZoom: 18,
	// 	attribution: 'Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
	// }).addTo(map);

	//Default Mapbox basemap
	var mapbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    id: 'joespatial.1f178a0o',
	    accessToken: 'pk.eyJ1Ijoiam9lc3BhdGlhbCIsImEiOiJjaW8xZ2l5anIxYTdzdTJtM2VocTlnZzAzIn0.mGcY_k9yy6ilXncp1I4MZg'
	});
	map.addLayer(mapbox);

	//Esri basemap
	var esriTopo = L.esri.basemapLayer('Topographic'),
			esriImg = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
				attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			}),
			omsRoads = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
				attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			});
	//basemap control
	var basemaps = {
		"Mapbox Pirate": mapbox,
		"OpenMapSurfer Roads": omsRoads,
		"Esri Topographic": esriTopo,
		"Esri World Imagery": esriImg
	};
	L.control.layers(basemaps).addTo(map);

	//add Fittpass json to map with custom icon
	$.getJSON("FitpassPark.geojson", function(data){
		var gymIcon = L.icon({
			iconUrl: 'images/gym.png'
		});
		var gyms = L.geoJson(data, {
			pointToLayer: function(feature, latlng){
				var marker = L.marker(latlng, {icon: gymIcon});
				marker.bindPopup("Community: " + feature.properties.Community + '<br/>' + "Hours: Mon - Fri " + feature.properties.MondayFri + " Sat/Sun: " +  feature.properties.SatSun + '<br/>' +  "Address: " + feature.properties.Adress + '<br/>' + "Link: " + feature.properties.Link);
				return marker;
			}
		});
		gyms.addTo(map);
	});

	// var marker = L.marker([35.780402, -78.639078]).addTo(map);

	// marker.bindPopup(marker.getLatLng().toString()).openPopup();

	//click anywhere and show latlng
	// var popup = L.popup();
	// function onMapClick(e){
	// 	popup.setLatLng(e.latlng).setContent('Location:'  + e.latlng.toString()).openOn(map);
	// }

	// map.on('click', onMapClick);

}(window, document, L));
