import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from '../ui/button';

// Leaflet default icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Create a custom icon using Lucide's MapPin
const customIcon = new L.DivIcon({
    className: 'custom-icon',
    html: renderToStaticMarkup(<MapPin color="red" size={30} />),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

const center = {
    // default semarang
    lat: -6.9667,
    lng: 110.4167,
};

const FormWithMap = ({ onLocationChange }) => {
    const [location, setLocation] = useState(center);
    const [address, setAddress] = useState('');
    const [kelurahan, setKelurahan] = useState('');
    const [kecamatan, setKecamatan] = useState('');
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleMapClick = async (lat, lng) => {
        setLocation({ lat, lng });

        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const result = response.data;
            const addressComponents = result.address;

            console.log('Address Data:', addressComponents); // Log data to inspect structure

            // Set kelurahan and kecamatan based on data
            const kelurahanComponent = addressComponents.suburb || addressComponents.village || addressComponents.city_district ||'';
            const kecamatanComponent = addressComponents.municipality || addressComponents.hamlet || addressComponents.city_district || addressComponents.town || addressComponents.city ||'';

            setAddress(result.display_name);
            setKelurahan(kelurahanComponent || '');
            setKecamatan(kecamatanComponent || '');

            onLocationChange({ lat, lng, address: result.display_name, kelurahan: kelurahanComponent || '', kecamatan: kecamatanComponent || '' });
        } catch (error) {
            console.error("Error fetching address data:", error);
        }
    };

    const MapClickHandler = () => {
        useMapEvents({
            click(event) {
                handleMapClick(event.latlng.lat, event.latlng.lng);
            },
        });
        return null;
    };

    const handleGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                handleMapClick(latitude, longitude);
            }, (error) => {
                console.error("Geolocation error:", error);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const MapUpdater = ({ location }) => {
        const map = useMap();
        useEffect(() => {
            map.setView(location, 13);
        }, [location]);
        return null;
    };

    return (
        <div className="p-4">
            <MapContainer className="w-full h-[400px] z-0" center={location} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={location} icon={customIcon}>
                    <Popup>
                        <MapPin color="red" size={32} />
                    </Popup>
                </Marker>
                <MapClickHandler />
                <MapUpdater location={location} />
            </MapContainer>
            <Button
                className="p-2 my-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
                onClick={handleGeolocation}
            >
                Use Current Location
            </Button>
            <div className="mt-4 p-4 bg-gray-100 rounded">
                <p>Alamat: {address}</p>
                <p>Kelurahan: {kelurahan}</p>
                <p>Kecamatan: {kecamatan}</p>
                <p>Latitude: {location.lat}</p>
                <p>Longitude: {location.lng}</p>
            </div>
        </div>
    );
};

export default FormWithMap;
