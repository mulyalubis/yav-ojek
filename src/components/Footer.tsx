import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0B1954] px-6 py-8 text-white sm:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
                    {/* LOGO & BRAND DESCRIPTION */}
                    <div className="flex flex-col items-center md:items-center">
                        <div className="flex h-12 items-center justify-center md:justify-start">
                            <img
                                src="/assets/logo.webp"
                                alt="YK Transport Logo"
                                className="h-full w-auto object-contain"
                            />
                        </div>

                        <p className="mt-3 max-w-xs text-center text-sm text-white/80 md:text-left">
                            Perjalanan aman, nyaman dan juga terjangkau
                        </p>
                    </div>

                    {/* NAVIGATION */}
                    <div className="text-center md:text-left">
                        <h3 className="mb-3 text-sm font-semibold tracking-wide uppercase text-white">
                            Navigation
                        </h3>

                        <div className="flex flex-col gap-2 text-sm text-white/80">
                            <a href="#home" className="transition hover:text-white">
                                Home
                            </a>
                            <a href="#about" className="transition hover:text-white">
                                About Us
                            </a>
                            <a href="#services" className="transition hover:text-white">
                                Services
                            </a>
                            <a href="#contact" className="transition hover:text-white">
                                Contact
                            </a>
                        </div>
                    </div>

                    {/* CONTACT */}
                    <div className="text-center md:text-left">
                        <h3 className="mb-3 text-sm font-semibold tracking-wide uppercase text-white">
                            Contact
                        </h3>

                        <div className="flex flex-col gap-3 text-sm text-white/80">
                            <div className="flex items-center justify-center gap-2 md:justify-start">
                                <MapPin size={16} className="shrink-0 text-emerald-400" />
                                <span>Banda Aceh, Indonesia</span>
                            </div>

                            <div className="flex items-center justify-center gap-2 md:justify-start">
                                <Phone size={16} className="shrink-0 text-emerald-400" />
                                <span>+62 812 3456 7890</span>
                            </div>

                            <div className="flex items-center justify-center gap-2 md:justify-start">
                                <Mail size={16} className="shrink-0 text-emerald-400" />
                                <span>info@yktransport.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM / COPYRIGHT */}
                <div className="mt-8 border-t border-white/20 pt-4 text-center">
                    <p className="text-xs text-white/60">
                        © 2026 YK Transport. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}