import {
    MapPin,
    Clock,
    Users,
    Wallet,
    CircleDollarSign,
    Route,
    User,
} from "lucide-react";
import type { Location } from "./MapPanel";

interface TripInformationProps {
    pickup: Location | null;
    destination: Location | null;
    selectedVehicle: string;
    paymentMethod: "COD" | "QRIS";
    customerName: string;
    passengerCount: number;
    distance: number | null;
    price: number;
    estimatedTime: number | null;
}

function formatPrice(price: number) {
    return new Intl.NumberFormat("id-ID").format(price);
}

export default function TripInformation({
    pickup,
    destination,
    paymentMethod,
    customerName,
    passengerCount,
    distance,
    price,
    estimatedTime,
}: TripInformationProps) {
    return (
        <div className="h-full rounded-xl bg-white p-4 sm:p-5">
            <h3 className="mb-3 text-base font-semibold text-black sm:text-lg">
                Informasi Perjalanan
            </h3>

            {/* Rincian Lokasi */}
            <div className="flex flex-col gap-3 border-b border-gray-200 pb-4">
                {/* Titik Awal */}
                <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                    <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Titik Awal</p>
                        <p className="mt-0.5 wrap-break-words text-xs font-medium text-black sm:text-sm">
                            {pickup ? pickup.address : "-"}
                        </p>
                    </div>
                </div>

                {/* Tujuan */}
                <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-rose-500" />
                    <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Tujuan</p>
                        <p className="mt-0.5 wrap-break-words text-xs font-medium text-black sm:text-sm">
                            {destination ? destination.address : "-"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid Informasi Detail */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 py-4 border-b border-gray-200">
                {/* Estimasi Waktu */}
                <div className="flex items-start gap-2.5">
                    <Clock size={18} className="mt-0.5 shrink-0 text-blue-600" />
                    <div className="min-w-0">
                        <p className="text-xs text-gray-500">Estimasi Perjalanan</p>
                        <p className="mt-0.5 text-xs font-semibold text-black sm:text-sm">
                            {estimatedTime !== null ? `${estimatedTime} Menit` : "-"}
                        </p>
                    </div>
                </div>

                {/* Jumlah Penumpang */}
                <div className="flex items-start gap-2.5">
                    <Users size={18} className="mt-0.5 shrink-0 text-blue-600" />
                    <div className="min-w-0">
                        <p className="text-xs text-gray-500">Penumpang</p>
                        <p className="mt-0.5 text-xs font-semibold text-black sm:text-sm">
                            {passengerCount} Orang
                        </p>
                    </div>
                </div>

                {/* Estimasi Harga */}
                <div className="flex items-start gap-2.5">
                    <CircleDollarSign size={18} className="mt-0.5 shrink-0 text-blue-600" />
                    <div className="min-w-0">
                        <p className="text-xs text-gray-500">Estimasi Harga</p>
                        <p className="mt-0.5 text-xs font-semibold text-black sm:text-sm">
                            {price > 0 ? `Rp ${formatPrice(price)}` : "-"}
                        </p>
                    </div>
                </div>

                {/* Jarak */}
                <div className="flex items-start gap-2.5">
                    <Route size={18} className="mt-0.5 shrink-0 text-blue-600" />
                    <div className="min-w-0">
                        <p className="text-xs text-gray-500">Jarak</p>
                        <p className="mt-0.5 text-xs font-semibold text-black sm:text-sm">
                            {distance !== null ? `${distance.toFixed(1)} km` : "-"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Pembayaran & Customer */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-4">
                <div className="flex items-start gap-2.5">
                    <Wallet size={18} className="mt-0.5 shrink-0 text-orange-500" />
                    <div className="min-w-0">
                        <p className="text-xs text-gray-500">Pembayaran</p>
                        <p className="mt-0.5 text-xs font-semibold text-black sm:text-sm">
                            {paymentMethod}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-2.5">
                    <User size={18} className="mt-0.5 shrink-0 text-gray-700" />
                    <div className="min-w-0">
                        <p className="text-xs text-gray-500">Nama Pemesan</p>
                        <p className="mt-0.5 truncate text-xs font-semibold text-black sm:text-sm">
                            {customerName || "-"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}