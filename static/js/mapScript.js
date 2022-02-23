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

class sidebarMap extends ol.control.Control {
/**
 * @param {Object} [opt_options] Control options.
 */
    constructor(opt_options) {
        const options = opt_options || {};


        const element = document.createElement('div');
        element.className = 'sidepanel';
        element.id = 'sidebarMap';
        element.style.display = 'none';
        super({
            element: element,
            target: options.target,
        });
    }

    static showPanel() {
        document.getElementById('sidebarMap').removeAttribute('style');
    }
    static hidePanel() {
        document.getElementById('sidebarMap').style.display = 'none';
    }
    static addData(data) {
        document.getElementById('sidebarMap').innerHTML = '';
        let id_zmarlego = data.get('layer_id');
        let sidePanelCm = document.getElementById('sidePanelCm');
        for(let zmarly of searchByID(id_zmarlego)){
            
            let card = document.createElement('div');
            card.style.width = '100%';
            card.innerHTML = `
            <div class="card text-dark bg-light mb-3 cardzmarly" style="max-width: 100%;">
            <div class="card-header">Kwatera ${zmarly.id_kwatera}</div>
            <div class="card-body">
                <h5 class="card-title">${zmarly.imie} ${zmarly.nazwisko}</h5>
                <h6 class=" mb-2 text-muted">${zmarly.nazwa}</h6>
                <h6 class=" mb-2 text-muted">Urodzony/a: ${zmarly.data_urodzenia}</h6>
                <h6 class=" mb-2 text-muted">Zmarły/a: ${zmarly.data_zgonu}</h6>
                <p class="card-text"></p>
            </div>
            </div>`
            document.getElementById('sidebarMap').appendChild(card);
        }
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
        highlighted = features[0];
        if(features.length === 0){
            unselectGrave();
            // sidebarMap.hidePanel();
            document.getElementById('sidePanelCm-all').removeAttribute('style');
            if(window.innerWidth < 900){
                document.getElementsByClassName('ol-zoom')[0].removeAttribute('style');
            }
            
        }else{
            unselectGrave();
            selectedLayer.getSource().addFeature(features[0]);
            document.getElementById('sidePanelCm-all').style.display = 'block';
            if(window.innerWidth < 900){
                document.getElementsByClassName('ol-zoom')[0].style.top = 'calc(.5em + 30%)';
            }
            
            let id_zmarlego = features[0].get('layer_id');
            let sidePanelCm = document.getElementById('sidePanelCm');
            for(let zmarly of searchByID(id_zmarlego)){
                
                let card = document.createElement('div');
                card.style.width = '100%';
                card.classList.add('cardzmarly');
                card.addEventListener('click', () => {
                    selectedLayer.getSource().clear();
                    selectedLayer.getSource().addFeature(features[0]);
                    const foundFt = grobySource.getFeatures().find(ft => ft.get('layer_id') === zmarly.id_kwatera);
                    let padd = [0, 0, 0, 0];
                    if (window.innerWidth > 900) {
                        padd = [0, 0, 0, 350];
                    } else {
                        padd = [350, 0, 0, 0];
                    }
                    mapa.getView().fit(foundFt.getGeometry().getExtent(), {
                        size: [150,150],
                        padding: padd,
                        duration: 700,
                    });
                })
                card.innerHTML = `
                <div class="card text-dark bg-light mb-3" style="max-width: 100%;">
      <div class="card-header">Kwatera ${zmarly.id_kwatera}</div>
      <div class="card-body">
        <h5 class="card-title">${zmarly.imie} ${zmarly.nazwisko}</h5>
        <h6 class=" mb-2 text-muted">${zmarly.nazwa}</h6>
        <h6 class=" mb-2 text-muted">Urodzony/a: ${zmarly.data_urodzenia}</h6>
        <h6 class=" mb-2 text-muted">Zmarły/a: ${zmarly.data_zgonu}</h6>
        <p class="card-text"></p>
      </div>
    </div>`
              sidePanelCm.appendChild(card);
            }
        }


    })
    

})

document.getElementById('closeButton').addEventListener('click',()=>{
    document.getElementById('sidePanelCm-all').removeAttribute('style');
    if(window.innerWidth < 900){
        document.getElementsByClassName('ol-zoom')[0].removeAttribute('style');
    }
    unselectGrave();
})

window.addEventListener('resize', () => {
    if (document.getElementById('sidePanelCm-all').style.display === 'block') {
        if(window.innerWidth < 900){
            document.getElementsByClassName('ol-zoom')[0].style.top = 'calc(.5em + 30%)';
        }
    }
    if(window.innerWidth > 900){
        document.getElementsByClassName('ol-zoom')[0].removeAttribute('style');
    }
})

document.getElementById('filter-wyszukaj').addEventListener('click', () => {
    let ursplit = document.getElementById('filter-urodzenie').value.split('-');
    let zgsplit = document.getElementById('filter-smierc').value.split('-');
    let ur = document.getElementById('filter-urodzenie').value === '' ? '' : `${ursplit[2]}.${ursplit[1]}.${ursplit[0]}`
    let zg = document.getElementById('filter-smierc').value === '' ? '' : `${zgsplit[2]}.${zgsplit[1]}.${zgsplit[0]}`
    let filterObj = {
        imie: document.getElementById('filter-imie').value,
        nazwisko: document.getElementById('filter-nazwisko').value,
        nazwa: document.getElementById('filter-msc').value,
        data_urodzenia: ur,
        data_zgonu: zg,
        // id_kwatera: document.getElementById('filter-kw').value,
        // id_kwatera_rzad: document.getElementById('filter-rzad').value,
        // id_kwatera_sektor: document.getElementById('filter-sektor').value,
    }
    // let filter_imie = document.getElementById('filter-imie').value;
    // let filter_nazwisko = document.getElementById('filter-nazwisko').value;
    // let filter_msc = document.getElementById('filter-msc').value;
    // let filter_urodzenie = document.getElementById('filter-urodzenie').value;
    // let filter_smierc = document.getElementById('filter-smierc').value;
    let filter_kw = document.getElementById('filter-kw').value;
    let filter_rzad = document.getElementById('filter-rzad').value;
    let filter_sektor = document.getElementById('filter-sektor').value;

    // console.log(filterObj);
    // console.log(dane2);
    let wynik = dane2.filter(osoba => {
        let valid = true;
        for (let [key, value] of Object.entries(osoba)) {
            if (filterObj[key] !== '' && filterObj[key]) {
                if (!value) {
                    value = '';
                }
                console.log(key);
                console.log(value);
                if (!value.toLowerCase().includes(filterObj[key].toLowerCase())) {
                    valid = false;
                }
            }
        }
        if (filter_kw !== '') {
            if (!osoba.id_kwatera.toLowerCase().includes(filter_kw.toLowerCase())){
                valid = false;
            }
        }
        if (filter_rzad !== '') {
            if (!osoba.id_kwatera.toLowerCase().includes(filter_rzad.toLowerCase())){
                valid = false;
            }
        }
        if (filter_sektor !== '') {
            if (!osoba.id_kwatera.toLowerCase().includes(filter_sektor.toLowerCase())){
                valid = false;
            }
        }
        if (valid) {
            return osoba;
        }
    })
    console.log(filterObj)
    console.log(wynik);
    if (wynik.length === 0) {
        document.getElementById('no-value').style.display = 'block';
        setTimeout(() => {
            document.getElementById('no-value').removeAttribute('style');
        }, 4000)
    } else {
        document.getElementById('sidePanelCm').innerHTML = '';
        const mod = document.getElementById('exampleModal');
        var modal = bootstrap.Modal.getOrCreateInstance(mod);
        modal.hide();
        document.getElementById('sidePanelCm-all').style.display = 'block';
        if(window.innerWidth < 900){
            document.getElementsByClassName('ol-zoom')[0].style.top = 'calc(.5em + 30%)';
        }
        let sidePanelCm = document.getElementById('sidePanelCm');
        for(let zmarly of wynik){
            
            let card = document.createElement('div');
            card.style.width = '100%';
            card.classList.add('cardzmarly');
            card.addEventListener('click', () => {
                const foundFt = grobySource.getFeatures().find(ft => ft.get('layer_id') === zmarly.id_kwatera);
                selectedLayer.getSource().addFeature(foundFt);
                let padd = [0, 0, 0, 0];
                if (window.innerWidth > 900) {
                    padd = [0, 0, 0, 350];
                } else {
                    padd = [350, 0, 0, 0];
                }
                mapa.getView().fit(foundFt.getGeometry().getExtent(), {
                    size: [150,150],
                    padding: padd,
                    duration: 700,
                });
            })
            card.innerHTML = `
            <div class="card text-dark bg-light mb-3" style="max-width: 100%;">
  <div class="card-header">Kwatera ${zmarly.id_kwatera}</div>
  <div class="card-body">
    <h5 class="card-title">${zmarly.imie} ${zmarly.nazwisko}</h5>
    <h6 class=" mb-2 text-muted">${zmarly.nazwa}</h6>
    <h6 class=" mb-2 text-muted">Urodzony/a: ${zmarly.data_urodzenia}</h6>
    <h6 class=" mb-2 text-muted">Zmarły/a: ${zmarly.data_zgonu}</h6>
    <p class="card-text"></p>
  </div>
</div>`
          sidePanelCm.appendChild(card);
        }
    }

})

document.getElementById('clearfilter').addEventListener('click', () => {
    let inputs = document.getElementsByClassName('form-control');
    for(let input of inputs) {
        input.value = '';
    }
})