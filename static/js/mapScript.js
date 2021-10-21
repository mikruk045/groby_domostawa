"use strict";

let map = document.getElementById('map');





let grobySource = new ol.source.Vector({
    features: []
})

for(let dana of dane){
    grobySource.addFeature(new ol.format.GeoJSON().readFeature(dana.geom));
}


let grobyLayer = new ol.layer.VectorImage({
    source: grobySource
})



let mapa = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }),
        grobyLayer,

    ],
    view: new ol.View({
        center: [2480636.5, 6551414.7],
        zoom:19,
        // rotation: 45,
    })
})

mapa.getView().fit(grobySource.getExtent())

console.log(JSON.parse(dane[0].geom));