import type { Location } from "../components/MapPanel";

export function calculateDistance(
    pickup: Location | null,
    destination: Location | null
) {
    if (!pickup || !destination) {
        return null;
    }

    const R = 6371;

    const lat1 = (pickup.lat * Math.PI) / 180;
    const lat2 = (destination.lat * Math.PI) / 180;

    const deltaLat =
        ((destination.lat - pickup.lat) * Math.PI) / 180;

    const deltaLng =
        ((destination.lng - pickup.lng) * Math.PI) / 180;

    const a =
        Math.sin(deltaLat / 2) ** 2 +
        Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) ** 2;

    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return R * c;
}

export function calculatePrice(
    distance: number | null,
    selectedVehicle: string
) {
    if (distance === null) {
        return 0;
    }

    const basePrice =
        selectedVehicle === "Nmax"
            ? 7000
            : 21000;

    const extraDistance = Math.max(
        0,
        distance - 4
    );

    return (
        basePrice +
        Math.ceil(extraDistance) *
        (
            selectedVehicle === "Nmax"
                ? 1750
                : 3500
        )
    );
}

export function calculateEstimatedTime(
    distance: number | null
) {
    if (distance === null) {
        return null;
    }

    return Math.max(
        1,
        Math.ceil(distance * 4)
    );
}

export function formatPrice(price: number) {
    return new Intl.NumberFormat("id-ID").format(price);
}