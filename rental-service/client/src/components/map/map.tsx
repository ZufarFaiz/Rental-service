import  {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './use-map';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from './const';

function Map({city, points, selectedPoint}:any) {
    const mapRef = useRef(null);
    const map = useMap(mapRef, city);
    const markersRef = useRef<leaflet.Marker[]>([]); // Храним ссылки на маркеры

    const defaultCustomIcon = leaflet.icon({
        iconUrl: URL_MARKER_DEFAULT,
        iconSize: [40, 40],
        iconAnchor: [20, 40], // Исправлено с 80 на 40
    });

    const currentCustomIcon = leaflet.icon({
        iconUrl: URL_MARKER_CURRENT,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    useEffect(() => {
        if (map) {
            // Удаляем все старые маркеры
            markersRef.current.forEach((marker) => {
                marker.remove();
            });
            markersRef.current = []; // Очищаем массив

            // Добавляем новые маркеры
            points.forEach((point:any) => {
                const marker = leaflet
                    .marker({
                        lat: point.lat,
                        lng: point.lng,
                    }, {
                        icon: (selectedPoint && point.title === selectedPoint.title)
                            ? currentCustomIcon
                            : defaultCustomIcon,
                    })
                    .addTo(map);

                markersRef.current.push(marker); // Сохраняем ссылку
            });
        }
    }, [map, points, selectedPoint]);

    return (
        <div
            style={{height: '100%'}}
            ref={mapRef}
        >
        </div>
    );
}

export default Map;