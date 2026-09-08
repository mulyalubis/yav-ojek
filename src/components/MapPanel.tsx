import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from "react-leaflet";
import L from "leaflet";

export interface Location {
    lat: number;
    lng: number;
    address: string;
}

interface MapPanelProps {
    pickup: Location | null;
    destination: Location | null;
    activeField: "pickup" | "destination" | null;
    onLocationSelect: (lat: number, lng: number) => void;
}

/*
|--------------------------------------------------------------------------
| Leaflet marker icon
|--------------------------------------------------------------------------
| Leaflet secara default kadang tidak menemukan file icon ketika
| digunakan bersama Vite. Karena itu kita tentukan icon secara manual.
*/

const markerIcon = new L.Icon({
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

/*
|--------------------------------------------------------------------------
| Map click handler
|--------------------------------------------------------------------------
| Component ini mendengarkan klik yang terjadi di dalam map.
*/

function MapClickHandler({
    onLocationSelect,
}: {
    onLocationSelect: (lat: number, lng: number) => void;
}) {
    useMapEvents({
        click(event) {
            const { lat, lng } = event.latlng;

            onLocationSelect(lat, lng);
        },
    });

    return null;
}

/*
|--------------------------------------------------------------------------
| MapPanel
|--------------------------------------------------------------------------
*/

export default function MapPanel({
    pickup,
    destination,
    activeField,
    onLocationSelect,
}: MapPanelProps) {
    /*
    |--------------------------------------------------------------------------
    | Posisi awal map
    |--------------------------------------------------------------------------
    | Untuk sementara kita gunakan Banda Aceh.
    | Nanti bisa diganti sesuai lokasi target project.
    */

    const defaultPosition: [number, number] = [
        5.5483,
        95.3238,
    ];

    return (
        <div className="relative overflow-hidden rounded-lg">
            {/*
      |--------------------------------------------------------------------------
      | Indicator kecil di atas map
      |--------------------------------------------------------------------------
      | Ini hanya muncul ketika user sudah memilih salah satu input.
      */}

            {activeField && (
                <div className="absolute left-3 top-3 z-999 rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-800 shadow-md">
                    {activeField === "pickup"
                        ? "Klik map untuk memilih titik awal"
                        : "Klik map untuk memilih tujuan"}
                </div>
            )}

            <MapContainer
                center={defaultPosition}
                zoom={14}
                scrollWheelZoom={true}
                className="h-62.5 w-full sm:h-70"
            >
                {/*
        |--------------------------------------------------------------------------
        | OpenStreetMap tiles
        |--------------------------------------------------------------------------
        */}

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/*
        |--------------------------------------------------------------------------
        | Map click
        |--------------------------------------------------------------------------
        */}

                <MapClickHandler
                    onLocationSelect={onLocationSelect}
                />

                {/*
        |--------------------------------------------------------------------------
        | Pickup marker
        |--------------------------------------------------------------------------
        */}

                {pickup && (
                    <Marker
                        position={[
                            pickup.lat,
                            pickup.lng,
                        ]}
                        icon={markerIcon}
                    >
                        <Popup>
                            <div className="text-sm">
                                <strong>Titik Awal</strong>

                                <div className="mt-1">
                                    {pickup.address}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                )}

                {/*
        |--------------------------------------------------------------------------
        | Destination marker
        |--------------------------------------------------------------------------
        */}

                {destination && (
                    <Marker
                        position={[
                            destination.lat,
                            destination.lng,
                        ]}
                        icon={markerIcon}
                    >
                        <Popup>
                            <div className="text-sm">
                                <strong>Tujuan</strong>

                                <div className="mt-1">
                                    {destination.address}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
}