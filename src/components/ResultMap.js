import {MapContainer, Marker, Polyline, Popup, TileLayer} from 'react-leaflet';
import tileLayer from './tileLayer';
import L from "leaflet";
import React from "react";
import markerUrl from "./marker.svg"

const iconLocation = new L.Icon({
    iconUrl: markerUrl,
    iconRetinaUrl: markerUrl,
    iconSize: new L.Point(30, 50),
    iconAnchor: [10, 40],
    // popupAnchor : [-3, -76],
    className: 'marker'
});

const COLOR = ["#fb0200", "#ff00df", "#00ff02", "#00d6ff", "#ffafaf"]

const ResultMao = ({tours}) => {
    const center = React.useMemo(()=>{
        let point = []
        if (tours?.length >0){
            tours?.every((tour)=>{
                if (tour?.stops?.length > 0){
                    point = [tour?.stops?.[0]?.location?.lat, tour?.stops?.[0]?.location?.lng]
                    return false
                }
                return true
            })
        }
        return point
    }, [tours])
    const points = React.useCallback((tour) => {
            if (tour?.stops?.length > 0) {
                return tour?.stops?.map((d) => {
                    return [d?.location?.lat, d?.location?.lng]
                })
            }

            return []
        }

        , [tours])
    return (
        tours && <MapContainer style={{ width: '100%', height: '90%' }} center={center} zoom={13} scrollWheelZoom={false}>

            <TileLayer {...tileLayer} />


            {tours.map((tour, index) => <ShowPoly points={points(tour)} color={COLOR[index % 5]} details={tour}/>)

            }
        </MapContainer>
    )
}

export default ResultMao;


const ShowPoly = ({points, color, details}) => {
    return points.map((pos, index) => <>
        <Polyline
            color={color}
            opacity={0.7}
            weight={5}
            positions={points.slice(index, index + 2)}
        >

            <Popup>
                <div>
                    <p><span className="text-black font-bold mr-2">Vehicle</span>{details?.vehicleId}</p>
                    <p><span className="text-black font-bold mr-2">Cost</span>{details?.statistic?.cost}</p>
                    <p><span className="text-black font-bold mr-2">Distance</span>{details?.statistic?.distance}</p>
                    <p><span className="text-black font-bold mr-2">Duration</span>{details?.statistic?.duration}</p>
                </div>
            </Popup>
        </Polyline>
        <Marker index={pos[0]} position={pos}
                icon={iconLocation}>
        </Marker>
    </>)
}