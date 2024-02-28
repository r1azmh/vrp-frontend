import React, {useEffect} from 'react';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';
import markerUrl from "./marker.svg"

const iconLocation = new L.Icon({
    iconUrl: markerUrl,
    iconRetinaUrl: markerUrl,
    iconSize: new L.Point(30, 50),
    className: 'marker'
});

const CustomMarker = ({setValue}) => {
    const map = useMap();


    const marker = L.marker(map.getCenter(), {
        icon: iconLocation,
        draggable: false,
        autoPan: false,
    });

    marker.on('dragend', function (e) {
        updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
    });

    map.on('click', function (e) {
        marker.setLatLng(e.latlng);
        updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);

    });

    function updateLatLng(lat, lng) {
        setValue({Latitude: lat, Longitude: lng});
        marker.addTo(map)
    }

    useEffect(() => {
        const searchControl = new GeoSearchControl({
            style: 'bar',
            provider: new OpenStreetMapProvider(),
            showMarker: false, // Let the custom marker handle it
        });

        map.addControl(searchControl);
        return () => map.removeControl(searchControl)
    }, []);

    return null;
};

const SearchComponent = ({setValue}) => {

    return (
        <MapContainer
            center={[50.5, 30.5]}
            zoom={12}
            style={{height: '300px', width: '100%'}}
        >
            <TileLayer
                url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
            />
            <CustomMarker setValue={setValue}/>
        </MapContainer>
    );
};

export default SearchComponent;
