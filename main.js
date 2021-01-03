import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { isNullOrUndefined } from 'util';

const provider = new OpenStreetMapProvider();
const searchControl = new GeoSearchControl({
    provider: provider,
});

FarmhouseBtn.addEventListener('click', printDbg);
function printDbg() {
    // let params = new URLSearchParams(document.location.hash)
    //let thisName = params.get('name');
    //console.log(thisName);
    // console.log(params.sli);
    let name = document.location.hash.slice(1);
    console.log(name);
}

let mapInit = L.map('mainMap').setView([44.476019, -73.211811], 10);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWlzc3ljaGxvZTczIiwiYSI6ImNqdHJ4azMxMDBtN2g0MHBpd3M3dGJjc3gifQ.7h_mmVOTwDWRt4czpxGXJg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mapInit);
mapInit.addControl(searchControl);
//return a url with .json, then use AJAX to get the info from that..
let name = document.location.hash.slice(1);
name = name == '' ? 'all' : name;
let ourRequest = new XMLHttpRequest();
let coordinates = [44.476019, -73.211811];
ourRequest.open('GET', 'http://localhost:8080/' + name + '.json');
ourRequest.onload = function () {
    let ourData = JSON.parse(ourRequest.responseText);
    console.log(ourData.name);
    coordinates = ourData.address;
    console.log(ourData);
};
ourRequest.send();

provider.search({query:coordinates});