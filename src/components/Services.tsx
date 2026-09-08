import { useState } from "react";
import {
    CircleDollarSign,
    CreditCard,
    MapPin,
    User,
    ChevronDown,
    ChevronUp,
    Users,
    ClipboardCheck,
} from "lucide-react";
import {
    calculateDistance,
    calculatePrice,
    calculateEstimatedTime,
} from "../utils/tripCalculation";
import MapPanel, { type Location } from "./MapPanel";
import TripInformation from "./TripInformation";
import { reverseGeocode } from "../utils/reverseGeocode";
import OrderReceipt from "./OrderReceipt";

const vehicles = ["Nmax", "Pajero Sport"];
type PaymentMethod = "COD" | "QRIS";

export default function Services() {
    const [selectedVehicle, setSelectedVehicle] = useState("Nmax");
    const [passengerCount, setPassengerCount] = useState(1);
    const [activeField, setActiveField] = useState<"pickup" | "destination" | null>(null);
    const [pickup, setPickup] = useState<Location | null>(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const [destination, setDestination] = useState<Location | null>(null);

    // Pembayaran
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);

    const [showPassengerOptions, setShowPassengerOptions] = useState(false);

    // Nama pemesan
    const [customerName, setCustomerName] = useState("");

    const handleMapLocationSelect = async (lat: number, lng: number) => {
        if (!activeField) return;
        const address = await reverseGeocode(lat, lng);
        const location: Location = {
            lat,
            lng,
            address,
        };
        if (activeField === "pickup") {
            setPickup(location);
            return;
        }
        if (activeField === "destination") {
            setDestination(location);
        }
    };

    const distance = calculateDistance(pickup, destination);
    const price = calculatePrice(distance, selectedVehicle);
    const estimatedTime = calculateEstimatedTime(distance);

    return (
        <section id="services" className="bg-[#F1F2F2] px-3 py-8 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-6xl">
                {/* Heading */}
                <h2 className="text-center text-xl font-normal leading-tight text-black sm:text-3xl">
                    Choose Your <span className="inline sm:inline">Services</span>
                </h2>

                {/* Vehicle Selection */}
                <div className="mt-4 flex items-center justify-center gap-4 sm:mt-6 sm:gap-8">
                    {vehicles.map((vehicle) => {
                        const isActive = selectedVehicle === vehicle;
                        return (
                            <button
                                key={vehicle}
                                type="button"
                                onClick={() => {
                                    setSelectedVehicle(vehicle);
                                    if (vehicle === "Nmax") {
                                        setPassengerCount(1);
                                    }
                                }}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition sm:text-base ${isActive
                                    ? "bg-[#10182F] text-white shadow-md"
                                    : "bg-white text-black hover:bg-gray-200"
                                    }`}
                            >
                                {vehicle}
                            </button>
                        );
                    })}
                </div>

                {/* Main booking container */}
                <div className="mt-6 rounded-2xl bg-[#0B1954] p-3 sm:p-5 lg:p-6">
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
                        {/* LEFT PANEL: MAP & INPUTS */}
                        <div className="flex flex-col gap-3">
                            {/* MAP */}
                            <div className="w-full overflow-hidden rounded-lg">
                                <MapPanel
                                    pickup={pickup}
                                    destination={destination}
                                    activeField={activeField}
                                    onLocationSelect={handleMapLocationSelect}
                                />
                            </div>

                            {/* Label */}
                            <p className="text-center text-xs font-medium text-white sm:text-sm">
                                Select Pickup Location & Destination on the Map
                            </p>

                            {/* INPUT FIELDS */}
                            <div className="flex flex-col gap-2.5">
                                {/* PICKUP INPUT */}
                                <button
                                    type="button"
                                    onClick={() => setActiveField("pickup")}
                                    className={`flex h-11 w-full items-center gap-3 rounded-lg bg-white px-3.5 text-left transition ${activeField === "pickup" ? "ring-2 ring-blue-400" : ""
                                        }`}
                                >
                                    <MapPin size={18} className="shrink-0 text-emerald-500" />
                                    <span className="truncate text-xs font-medium text-black sm:text-sm">
                                        {pickup ? pickup.address : "Pilih titik awal"}
                                    </span>
                                </button>

                                {/* DESTINATION INPUT */}
                                <button
                                    type="button"
                                    onClick={() => setActiveField("destination")}
                                    className={`flex h-11 w-full items-center gap-3 rounded-lg bg-white px-3.5 text-left transition ${activeField === "destination" ? "ring-2 ring-blue-400" : ""
                                        }`}
                                >
                                    <MapPin size={18} className="shrink-0 text-rose-500" />
                                    <span className="truncate text-xs font-medium text-black sm:text-sm">
                                        {destination ? destination.address : "Pilih tujuan"}
                                    </span>
                                </button>

                                {/* TARIF & JUMLAH PENUMPANG */}
                                <div
                                    className={`grid gap-2.5 ${selectedVehicle === "Pajero Sport" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
                                        }`}
                                >
                                    {/* TARIF */}
                                    <div className="flex h-11 items-center justify-between rounded-lg bg-white px-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <CircleDollarSign size={18} className="shrink-0 text-emerald-500" />
                                            <span className="text-xs font-medium text-black sm:text-sm">
                                                {selectedVehicle === "Nmax" ? "7.000 / 4km" : "21.000 / 4km"}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-500">Tarif Jarak</span>
                                    </div>

                                    {/* JUMLAH PENUMPANG - PAJERO */}
                                    {selectedVehicle === "Pajero Sport" && (
                                        <div className="relative">
                                            {/* Tombol Dropdown */}
                                            <button
                                                type="button"
                                                onClick={() => setShowPassengerOptions(!showPassengerOptions)}
                                                className="flex h-11 w-full items-center justify-between rounded-lg bg-white px-3.5 text-xs text-black sm:text-sm"
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <Users size={18} className="shrink-0 text-black" />
                                                    <span className="font-medium">{passengerCount} Orang</span>
                                                </div>
                                                {showPassengerOptions ? (
                                                    <ChevronUp size={18} className="text-black" />
                                                ) : (
                                                    <ChevronDown size={18} className="text-black" />
                                                )}
                                            </button>

                                            {/* Menu Pilihan Penumpang */}
                                            {showPassengerOptions && (
                                                <div className="absolute top-12 left-0 z-50 w-full overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black/5">
                                                    {[1, 2, 3, 4, 5].map((count) => (
                                                        <button
                                                            key={count}
                                                            type="button"
                                                            onClick={() => {
                                                                setPassengerCount(count);
                                                                setShowPassengerOptions(false);
                                                            }}
                                                            className={`flex w-full px-4 py-2.5 text-left text-xs font-medium transition hover:bg-gray-100 sm:text-sm ${passengerCount === count ? "bg-gray-100 font-semibold text-blue-600" : "text-black"
                                                                }`}
                                                        >
                                                            {count} Orang
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* PEMBAYARAN & NAMA PEMESAN */}
                                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                                    {/* PAYMENT DROPDOWN */}
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                                            className="flex h-11 w-full items-center justify-between rounded-lg bg-white px-3.5 text-xs text-black sm:text-sm"
                                        >
                                            <div className="flex items-center gap-2">
                                                <CreditCard size={18} className="shrink-0 text-orange-500" />
                                                <span className="font-medium">{paymentMethod}</span>
                                            </div>
                                            {showPaymentOptions ? (
                                                <ChevronUp size={18} className="text-black" />
                                            ) : (
                                                <ChevronDown size={18} className="text-black" />
                                            )}
                                        </button>

                                        {/* OPTIONS MENU */}
                                        {showPaymentOptions && (
                                            <div className="absolute top-12 left-0 z-50 w-full overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black/5">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setPaymentMethod("COD");
                                                        setShowPaymentOptions(false);
                                                    }}
                                                    className="flex w-full px-4 py-2.5 text-left text-xs font-medium text-black hover:bg-gray-100 sm:text-sm"
                                                >
                                                    COD
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setPaymentMethod("QRIS");
                                                        setShowPaymentOptions(false);
                                                    }}
                                                    className="flex w-full px-4 py-2.5 text-left text-xs font-medium text-black hover:bg-gray-100 sm:text-sm"
                                                >
                                                    QRIS
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* CUSTOMER NAME */}
                                    <div className="flex h-11 items-center gap-2.5 rounded-lg bg-white px-3.5">
                                        <User size={18} className="shrink-0 text-black" />
                                        <input
                                            type="text"
                                            value={customerName}
                                            onChange={(event) => setCustomerName(event.target.value)}
                                            placeholder="Nama Pemesan"
                                            className="w-full min-w-0 bg-transparent text-xs text-black outline-none placeholder:text-gray-400 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT PANEL: TRIP INFORMATION */}
                        <div className="flex flex-col justify-between gap-4">
                            <TripInformation
                                pickup={pickup}
                                destination={destination}
                                selectedVehicle={selectedVehicle}
                                paymentMethod={paymentMethod}
                                customerName={customerName}
                                passengerCount={passengerCount}
                                distance={distance}
                                price={price}
                                estimatedTime={estimatedTime}
                            />

                            {/* CONFIRMATION BUTTON */}
                            <button
                                type="button"
                                onClick={() => setShowReceipt(true)}
                                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black transition hover:bg-gray-100 active:scale-[0.99] sm:text-base"
                            >
                                <ClipboardCheck size={20} />
                                Konfirmasi Pesanan
                            </button>
                        </div>
                    </div>

                    {/* RECEIPT MODAL */}
                    {showReceipt && (
                        <OrderReceipt
                            pickup={pickup}
                            destination={destination}
                            selectedVehicle={selectedVehicle}
                            passengerCount={passengerCount}
                            paymentMethod={paymentMethod}
                            customerName={customerName}
                            distance={distance}
                            price={price}
                            estimatedTime={estimatedTime}
                            onClose={() => setShowReceipt(false)}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}