"use client";

import { useEffect } from "react";
import {
    Map,
    MapMarker,
    MarkerContent,
    MapPopup,
    MapControls,
    useMap,
} from "@/components/ui/map";

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
| Custom Click Listener via MapLibre Instance
|--------------------------------------------------------------------------
*/
function MapClickHandler({
    onLocationSelect,
}: {
    onLocationSelect: (lat: number, lng: number) => void;
}) {
    const { map } = useMap();

    useEffect(() => {
        if (!map) return;

        const handleClick = (e: any) => {
            if (e.lngLat) {
                onLocationSelect(e.lngLat.lat, e.lngLat.lng);
            }
        };

        map.on("click", handleClick);
        return () => {
            map.off("click", handleClick);
        };
    }, [map, onLocationSelect]);

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
    // Posisi awal peta Banda Aceh: [longitude, latitude]
    const defaultCenter: [number, number] = [95.3238, 5.5483];

    return (
        <div className="relative overflow-hidden rounded-lg">
            {/* Indicator aktif */}
            {activeField && (
                <div className="absolute left-3 top-3 z-50 rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-800 shadow-md">
                    {activeField === "pickup"
                        ? "Klik map untuk memilih titik awal"
                        : "Klik map untuk memilih tujuan"}
                </div>
            )}

            <Map
                styles={{
                    light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
                }}
                center={defaultCenter}
                zoom={14}
                className="h-62.5 w-full sm:h-70"
            >
                <MapControls position="bottom-right" />
                <MapClickHandler onLocationSelect={onLocationSelect} />

                {/* Marker & Popup Titik Awal */}
                {pickup && (
                    <MapMarker
                        longitude={pickup.lng}
                        latitude={pickup.lat}
                        anchor="bottom"
                    >
                        <MarkerContent>
                            <img
                                src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png"
                                alt="Pickup Marker"
                                className="h-10.25 w-6.25 drop-shadow-md"
                            />
                        </MarkerContent>
                    </MapMarker>
                )}

                {pickup && pickup.address && (
                    <MapPopup
                        longitude={pickup.lng}
                        latitude={pickup.lat}
                        anchor="bottom"
                        offset={[0, -42]}
                        closeButton={false}
                    >
                        <div className="p-1 text-xs">
                            <strong>Titik Awal</strong>
                            <div className="mt-0.5">{pickup.address}</div>
                        </div>
                    </MapPopup>
                )}

                {/* Marker & Popup Tujuan */}
                {destination && (
                    <MapMarker
                        longitude={destination.lng}
                        latitude={destination.lat}
                        anchor="bottom"
                    >
                        <MarkerContent>
                            <img
                                src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png"
                                alt="Destination Marker"
                                className="h-10.25 w-6.25 drop-shadow-md"
                            />
                        </MarkerContent>
                    </MapMarker>
                )}

                {destination && destination.address && (
                    <MapPopup
                        longitude={destination.lng}
                        latitude={destination.lat}
                        anchor="bottom"
                        offset={[0, -42]}
                        closeButton={false}
                    >
                        <div className="p-1 text-xs">
                            <strong>Tujuan</strong>
                            <div className="mt-0.5">{destination.address}</div>
                        </div>
                    </MapPopup>
                )}
            </Map>
        </div>
    );
}