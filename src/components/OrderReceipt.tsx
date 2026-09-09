import { X, Download, ClipboardCheck } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import type { Location } from "./MapPanel";

interface OrderReceiptProps {
    pickup: Location | null;
    destination: Location | null;
    selectedVehicle: string;
    passengerCount: number;
    paymentMethod: "COD" | "QRIS";
    customerName: string;
    distance: number | null;
    price: number;
    estimatedTime: number | null;
    onClose: () => void;
}

function formatPrice(price: number) {
    return new Intl.NumberFormat("id-ID").format(price);
}

export default function OrderReceipt({
    pickup,
    destination,
    selectedVehicle,
    passengerCount,
    paymentMethod,
    customerName,
    distance,
    price,
    estimatedTime,
    onClose,
}: OrderReceiptProps) {
    const orderNumber = `YAV-OJ-${Date.now().toString().slice(-6)}`;

    const handleDownload = () => {
        const printContent = document.getElementById("printable-receipt");

        if (!printContent) return;

        // Clone isi struk supaya tampilan asli tidak berubah
        const clonedContent = printContent.cloneNode(true) as HTMLElement;

        // Cari semua canvas, termasuk QR Code
        const originalCanvases = printContent.querySelectorAll("canvas");
        const clonedCanvases = clonedContent.querySelectorAll("canvas");

        originalCanvases.forEach((canvas, index) => {
            const clonedCanvas = clonedCanvases[index];

            if (!clonedCanvas) return;

            // Ambil gambar QR dari canvas
            const image = document.createElement("img");
            image.src = canvas.toDataURL("image/png");

            image.width = canvas.width;
            image.height = canvas.height;

            image.style.display = "block";
            image.style.margin = "0 auto";

            // Ganti canvas dengan gambar
            clonedCanvas.replaceWith(image);
        });

        // Buat iframe untuk print
        let iframe = document.getElementById(
            "print-iframe"
        ) as HTMLIFrameElement | null;

        if (!iframe) {
            iframe = document.createElement("iframe");

            iframe.id = "print-iframe";
            iframe.style.position = "fixed";
            iframe.style.right = "0";
            iframe.style.bottom = "0";
            iframe.style.width = "0";
            iframe.style.height = "0";
            iframe.style.border = "0";

            document.body.appendChild(iframe);
        }

        const iframeDoc = iframe.contentWindow?.document;

        if (!iframeDoc) return;

        // Tulis isi struk ke iframe
        iframeDoc.open();

        iframeDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />

            <title>Bukti Pesanan - ${orderNumber}</title>

            <script src="https://cdn.tailwindcss.com"></script>

            <style>
                * {
                    box-sizing: border-box;
                }

                body {
                    font-family: Arial, sans-serif;
                    background: white;
                    margin: 0;
                    padding: 20px;
                }

                .print-wrapper {
                    width: 100%;
                    max-width: 400px;
                    margin: 0 auto;
                }

                img {
                    max-width: 100%;
                }

                @page {
                    margin: 10mm;
                }
            </style>
        </head>

        <body>
            <div class="print-wrapper">
                ${clonedContent.outerHTML}
            </div>

            <script>
                setTimeout(() => {
                    window.focus();
                    window.print();
                }, 1000);
            </script>
        </body>
        </html>
    `);

        iframeDoc.close();
    };

    return (
        <div className="fixed inset-0 z-2000 flex items-center justify-center bg-black/50 p-4">
            {/* MODAL CONTAINER */}
            <div className="relative max-h-[90vh] w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-2xl">
                {/* CLOSE BUTTON */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-3 top-3 z-10 rounded-full p-1 text-gray-500 transition hover:bg-gray-100"
                >
                    <X size={20} />
                </button>

                <div className="max-h-[90vh] overflow-y-auto p-5">
                    {/* AREA KHUSUS STRUK YANG DIPRIN */}
                    <div id="printable-receipt">
                        {/* HEADER */}
                        <div className="text-center">
                            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#0B1954] text-white">
                                <ClipboardCheck size={22} />
                            </div>
                            <h2 className="mt-3 text-lg font-semibold text-[#0B1954]">
                                Bukti Pesanan
                            </h2>
                            <p className="mt-1 text-xs text-gray-500">{orderNumber}</p>
                        </div>

                        {/* DATA PESANAN */}
                        <div className="mt-5 space-y-3">
                            <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-3">
                                <span className="text-xs text-gray-500">Nama Pemesan</span>
                                <span className="max-w-[60%] text-right text-sm font-medium text-black wrap-break-words">
                                    {customerName || "-"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                                <span className="text-xs text-gray-500">Kendaraan</span>
                                <span className="text-sm font-medium text-black">
                                    {selectedVehicle}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                                <span className="text-xs text-gray-500">Penumpang</span>
                                <span className="text-sm text-black">{passengerCount} Orang</span>
                            </div>

                            <div className="border-b border-gray-200 pb-3">
                                <p className="text-xs text-gray-500">Titik Awal</p>
                                <p className="mt-1 text-sm leading-5 text-black wrap-break-words">
                                    {pickup?.address || "-"}
                                </p>
                            </div>

                            <div className="border-b border-gray-200 pb-3">
                                <p className="text-xs text-gray-500">Tujuan</p>
                                <p className="mt-1 text-sm leading-5 text-black wrap-break-words">
                                    {destination?.address || "-"}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                                <div>
                                    <p className="text-xs text-gray-500">Jarak</p>
                                    <p className="mt-1 text-sm text-black">
                                        {distance !== null ? `${distance.toFixed(1)} km` : "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Estimasi Perjalanan</p>
                                    <p className="mt-1 text-sm text-black">
                                        {estimatedTime !== null ? `${estimatedTime} Menit` : "-"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                                <span className="text-xs text-gray-500">Pembayaran</span>
                                <span className="text-sm font-medium text-black">
                                    {paymentMethod}
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <span className="text-sm font-medium text-gray-600">
                                    Total Harga
                                </span>
                                <span className="text-lg font-semibold text-[#0B1954]">
                                    Rp {formatPrice(price)}
                                </span>
                            </div>
                        </div>

                        {/* QRIS */}
                        {paymentMethod === "QRIS" && (
                            <div className="mt-5 border-t border-gray-200 pt-5 text-center">
                                <p className="text-sm font-medium text-black">
                                    Pembayaran QRIS
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Scan kode QR di bawah untuk melakukan pembayaran
                                </p>
                                <div className="mt-4 flex justify-center">
                                    <QRCodeCanvas
                                        value={JSON.stringify({
                                            merchant: "YK Transport",
                                            order: orderNumber,
                                            amount: price,
                                            customer: customerName,
                                        })}
                                        size={170}
                                    />
                                </div>
                                <p className="mt-3 text-[11px] text-gray-400">YK Transport</p>
                            </div>
                        )}
                    </div>

                    {/* TOMBOL DOWNLOAD */}
                    <button
                        type="button"
                        onClick={handleDownload}
                        className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#0B1954] text-sm font-medium text-white transition hover:bg-[#10182F]"
                    >
                        <Download size={18} />
                        Download Bukti Pesanan
                    </button>
                </div>
            </div>
        </div>
    );
}