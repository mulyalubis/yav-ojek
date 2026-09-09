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
        <div
            className="
                w-full
                min-w-0
                rounded-xl
                bg-white
                p-4
                sm:p-5
                min-h-117
            "
        >
            {/* HEADER */}
            <h3
                className="
                    mb-4
                    text-base
                    font-semibold
                    text-black
                    sm:text-lg
                "
            >
                Informasi Perjalanan
            </h3>

            {/* LOKASI */}
            <div className="min-w-0 border-b border-gray-200 pb-4">
                {/* TITIK AWAL */}
                <div className="flex min-w-0 items-start gap-3">
                    <MapPin
                        size={18}
                        className="mt-0.5 shrink-0 text-emerald-500"
                    />

                    <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">
                            Titik Awal
                        </p>

                        <p
                            className="
                                mt-1
                                text-xs
                                font-medium
                                leading-5
                                text-black
                                sm:text-sm
                                wrap-break-word
                            "
                        >
                            {pickup ? pickup.address : "-"}
                        </p>
                    </div>
                </div>

                {/* TUJUAN */}
                <div className="mt-4 flex min-w-0 items-start gap-3">
                    <MapPin
                        size={18}
                        className="mt-0.5 shrink-0 text-rose-500"
                    />

                    <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">
                            Tujuan
                        </p>

                        <p
                            className="
                                mt-1
                                text-xs
                                font-medium
                                leading-5
                                text-black
                                sm:text-sm
                                wrap-break-word
                            "
                        >
                            {destination ? destination.address : "-"}
                        </p>
                    </div>
                </div>
            </div>

            {/* DETAIL PERJALANAN */}
            <div className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-5 border-b border-gray-200 py-4">
                {/* ESTIMASI WAKTU */}
                <div className="flex min-w-0 items-start gap-2.5">
                    <Clock
                        size={18}
                        className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <div className="min-w-0">
                        <p className="text-xs text-gray-500">
                            Estimasi Perjalanan
                        </p>

                        <p className="mt-1 text-xs font-semibold text-black sm:text-sm">
                            {estimatedTime !== null
                                ? `${estimatedTime} Menit`
                                : "-"}
                        </p>
                    </div>
                </div>

                {/* PENUMPANG */}
                <div className="flex min-w-0 items-start gap-2.5">
                    <Users
                        size={18}
                        className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <div className="min-w-0">
                        <p className="text-xs text-gray-500">
                            Penumpang
                        </p>

                        <p className="mt-1 text-xs font-semibold text-black sm:text-sm">
                            {passengerCount} Orang
                        </p>
                    </div>
                </div>

                {/* HARGA */}
                <div className="flex min-w-0 items-start gap-2.5">
                    <CircleDollarSign
                        size={18}
                        className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <div className="min-w-0">
                        <p className="text-xs text-gray-500">
                            Estimasi Harga
                        </p>

                        <p className="mt-1 text-xs font-semibold text-black sm:text-sm">
                            {price > 0
                                ? `Rp ${formatPrice(price)}`
                                : "-"}
                        </p>
                    </div>
                </div>

                {/* JARAK */}
                <div className="flex min-w-0 items-start gap-2.5">
                    <Route
                        size={18}
                        className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <div className="min-w-0">
                        <p className="text-xs text-gray-500">
                            Jarak
                        </p>

                        <p className="mt-1 text-xs font-semibold text-black sm:text-sm">
                            {distance !== null
                                ? `${distance.toFixed(1)} km`
                                : "-"}
                        </p>
                    </div>
                </div>
            </div>

            {/* PEMBAYARAN + CUSTOMER */}
            <div className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-4 pt-4">
                {/* PEMBAYARAN */}
                <div className="flex min-w-0 items-start gap-2.5">
                    <Wallet
                        size={18}
                        className="mt-0.5 shrink-0 text-orange-500"
                    />

                    <div className="min-w-0">
                        <p className="text-xs text-gray-500">
                            Pembayaran
                        </p>

                        <p className="mt-1 text-xs font-semibold text-black sm:text-sm">
                            {paymentMethod}
                        </p>
                    </div>
                </div>

                {/* NAMA PEMESAN */}
                <div className="flex min-w-0 items-start gap-2.5">
                    <User
                        size={18}
                        className="mt-0.5 shrink-0 text-gray-700"
                    />

                    <div className="min-w-0">
                        <p className="text-xs text-gray-500">
                            Nama Pemesan
                        </p>

                        <p className="mt-1 text-xs font-semibold leading-5 text-black sm:text-sm wrap-break-word">
                            {customerName || "-"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}