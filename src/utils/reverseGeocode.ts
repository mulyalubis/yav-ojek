export async function reverseGeocode(
    lat: number,
    lng: number
): Promise<string> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2&accept-language=id`
        );

        if (!response.ok) {
            throw new Error("Gagal mendapatkan alamat");
        }

        const data = await response.json();

        return (
            data.display_name ??
            `${lat.toFixed(5)}, ${lng.toFixed(5)}`
        );
    } catch {
        return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
}