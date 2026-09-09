export async function reverseGeocode(
    lat: number,
    lng: number
): Promise<string> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2&accept-language=id`,
            {
                headers: {
                    // Wajib tambahkan User-Agent unik agar tidak diblokir Nominatim
                    "User-Agent": "YKTransportApp/1.0",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Gagal mendapatkan alamat dari server");
        }

        const data = await response.json();

        // 1. Coba susun alamat ringkas (Jalan, Kelurahan/Kecamatan, Kota)
        if (data.address) {
            const road = data.address.road || data.address.pedestrian || data.address.suburb || "";
            const city = data.address.city || data.address.town || data.address.city_district || data.address.county || "";

            if (road && city) {
                return `${road}, ${city}`;
            }
        }

        // 2. Fallback ke display_name jika susunan di atas tidak lengkap
        if (data.display_name) {
            return data.display_name;
        }

        return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    } catch (error) {
        console.error("Reverse Geocode Error:", error);
        return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
}