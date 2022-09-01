import 'leaflet/dist/leaflet.css';
import './map.scss';

const L =require ('leaflet');

import {carto_light} from './layers/control-layers'
import {standard_osm} from './layers/control-layers';
import { standard_osm_mm } from './layers/control-layers';
import { OpenStreetMap_HOT } from './layers/control-layers';
import { minimap } from './controls/minimap';
import { faCaretSquareRight } from '@fortawesome/free-regular-svg-icons';
import { catastro } from './layers/predios-catastro';
import { perimetro } from './layers/perimetro';
import red from '../../assets/img/rojo.png'


export var map = L.map('map', {
    
    center: [10.494444, -75.124167],
    zoom: 15,
    layers: [OpenStreetMap_HOT]
});

minimap.addTo(map);
L.control.zoom({position: 'topright'}).addTo(map);

// scale control
new L.control.scale({imperial: false}).addTo(map)

var iconBase = L.icon({
   iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
   shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
   iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})



new L.marker([10.494444, -75.124167], {icon: iconBase}).addTo(map).bindTooltip(`<div><p>Repelón</p></div>`,{
    opacity: 1,
    direction: "center",
    sticky: true
})

function popup (features, layer){
    if(features.properties && features.properties.area && features.properties.codigo){
        layer.bindPopup(`<p><strong>Área: </strong>${features.properties.area}</p><p><strong>Código :</strong> ${features.properties.codigo}</p>`)
    }
}

L.geoJSON(catastro).addTo(map);
L.geoJSON(perimetro).addTo(map);

var catastros = L.geoJSON(catastro, {
    onEachFeature: popup
}).addTo(map)

