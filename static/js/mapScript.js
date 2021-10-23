"use strict";

let map = document.getElementById('map');

function searchByID(id){
    return dane2.filter(zmarly => zmarly.id_kwatera === id)
}

function unselectGrave(){
    document.getElementById('sidePanelCm').innerHTML = '';
    selectedLayer.getSource().clear();
}

let grobyBezZmarlych = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        features: [],
    }),
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'grey',
        }),
        stroke: new ol.style.Stroke({
            color: 'white',
            weight: 1,
        }),
    })
});

let highlightedLayer = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        features: [],
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgb(29, 91, 153)',
            width: 4,
        }),
    })
});


let selectedLayer = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        features: [],
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgb(29, 91, 153)',
            width: 4,
        }),
    })
});



let grobySource = new ol.source.Vector({
    features: []
})

for(let dana of dane){
    if(searchByID(dana.id).length === 0){
        let newFeatureBlank = new ol.format.GeoJSON().readFeature(dana.geom);
        grobyBezZmarlych.getSource().addFeature(newFeatureBlank);
    }else{
        let newFeature = new ol.format.GeoJSON().readFeature(dana.geom);
        newFeature.set('layer_id', dana.id);
        grobySource.addFeature(newFeature);
    }
}

let customStyles = function(feature, resolution){
    if(searchByID(feature.get('layer_id')).length >= 1 && searchByID(feature.get('layer_id')).length <= 2){
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgb(224, 243, 219, 0.8)',
            }),
            stroke: new ol.style.Stroke({
                color: 'rgb(51, 153, 255)',
                weight: 1,
            }),
        })
    }else if(searchByID(feature.get('layer_id')).length >= 3 && searchByID(feature.get('layer_id')).length <= 4){
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgb(168, 221, 181, 0.8)',
            }),
            stroke: new ol.style.Stroke({
                color: 'rgb(51, 153, 255)',
                weight: 1,
            }),
        })
    }else{
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgb(67, 162, 202, 0.8)',
            }),
            stroke: new ol.style.Stroke({
                color: 'rgb(51, 153, 255)',
                weight: 1,
            }),
        })
    }

}

let grobyLayer = new ol.layer.VectorImage({
    source: grobySource,
    style: customStyles
})

class RotateNorthControl extends ol.control.Control {
    /**
     * @param {Object} [opt_options] Control options.
     */
    constructor(opt_options) {
      const options = opt_options || {};
  
  
      const element = document.createElement('div');
      element.className = 'rotate-north ol-unselectable ol-control';
      element.id = 'contentkwatera';
      element.style.display = 'none';
      super({
        element: element,
        target: options.target,
      });
  
    //   button.addEventListener('click', this.handleRotateNorth.bind(this), false);
    }
  

    static setText(text) {
        document.getElementById('contentkwatera').textContent = text;
    }
    static hideText() {
        document.getElementById('contentkwatera').style.display = 'none';
    }
    static showText() {
        document.getElementById('contentkwatera').removeAttribute('style');
    }
    
  }

let mapa = new ol.Map({
    target: 'map',
    controls: ol.control.defaults().extend([new RotateNorthControl()]),
    layers: [
        // new ol.layer.Tile({
        //     source: new ol.source.XYZ({
        //         url: 'https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
        //     }),
        // }),
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }),
        // grobyBezZmarlych,
        grobyLayer,
        highlightedLayer,
        selectedLayer,

    ],
    view: new ol.View({
        center: [2480636.5, 6551414.7],
        zoom:19,
    })
})

mapa.getView().fit(grobySource.getExtent())

let highlighted;
function displayFeatureInfo(pixel){
    grobyLayer.getFeatures(pixel).then((features) => {
        if(features.length > 0){
            RotateNorthControl.setText(`Kwatera ${features[0].get('layer_id')}`);
            RotateNorthControl.showText();
            mapa.getTargetElement().style.cursor = 'pointer';

            if(features[0] !== highlighted){
                highlightedLayer.getSource().clear();
                highlightedLayer.getSource().addFeature(features[0]);
            }
            highlighted = features[0];
            
        }else{
            RotateNorthControl.hideText();
            mapa.getTargetElement().style.cursor = '';
            highlightedLayer.getSource().clear();
            highlighted = undefined;
        }
    });

}

mapa.on('pointermove', function (evt) {
    if (!evt.dragging) {
      displayFeatureInfo(evt.pixel);
    }
  });

mapa.on('click', (evt) => {
    grobyLayer.getFeatures(evt.pixel).then((features) => {
        if(features.length === 0){
            unselectGrave();
        }
    })
    if(highlighted !== undefined){
        unselectGrave();
        selectedLayer.getSource().addFeature(highlighted);
        let id_zmarlego = highlighted.get('layer_id');
        let sidePanelCm = document.getElementById('sidePanelCm');

        for(let zmarly of searchByID(id_zmarlego)){
            
            let card = document.createElement('div');
            card.style.width = '100%';
            card.innerHTML = `
            <div class="card text-dark bg-light mb-3" style="max-width: 100%;">
  <div class="card-header">Kwatera ${zmarly.id_kwatera}</div>
  <div class="card-body">
    <h5 class="card-title">${zmarly.imie} ${zmarly.nazwisko}</h5>
    <h6 class=" mb-2 text-muted">${zmarly.data_urodzenia} - ${zmarly.data_zgonu}</h6>
    <p class="card-text"></p>
  </div>
</div>`
          sidePanelCm.appendChild(card);
        }
    }
})

// document.getElementById('closeButton').addEventListener('click',()=>{
//     document.getElementById('sidePanelCm-all').style.display = 'none';
// })