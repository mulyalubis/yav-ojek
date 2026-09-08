import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="absolute left-0 top-0 z-50 w-full px-3 pt-4 sm:px-5 sm:pt-5">
            <nav
                className="
                    mx-auto
                    w-full
                    max-w-80
                    rounded-xl
                    bg-[#0B1954]
                    shadow-lg

                    sm:max-w-100
                    sm:rounded-md

                    lg:max-w-130
                    lg:rounded-xl
                "
            >
                <div
                    className="
                        relative
                        flex
                        h-12
                        items-center
                        justify-center
                        px-3

                        sm:h-12
                        sm:px-4

                        lg:h-14
                        lg:px-5
                    "
                >
                    {/* LOGO */}
                    <a
                        href="#home"
                        aria-label="Y Transport"
                        className="
                            absolute
                            left-0
                            top-1/2
                            z-10
                            -translate-y-1/2

                            sm:left-1/2
                            sm:-translate-x-1/2
                        "
                    >
                        <img
                            src="/assets/logo.png"
                            className="
                                h-10
                                w-auto
                                place-self-center

                                sm:h-10

                                lg:h-12
                            "
                            alt="Y Transport"
                        />
                    </a>

                    {/* DESKTOP + TABLET NAVIGATION */}
                    <div
                        className="
                            hidden
                            w-full
                            items-center
                            justify-center

                            sm:flex
                            sm:gap-20
                            sm:px-1

                            lg:gap-30
                            lg:px-2
                        "
                    >
                        {/* LEFT MENU */}
                        <div className="flex items-center gap-3 sm:gap-4 lg:gap-8">
                            <a
                                href="#home"
                                className="
                                    text-xs
                                    font-medium
                                    text-white/90
                                    transition-colors
                                    duration-200
                                    hover:text-white

                                    lg:text-sm
                                "
                            >
                                Home
                            </a>

                            <a
                                href="#about"
                                className="
                                    text-xs
                                    font-medium
                                    text-white/90
                                    transition-colors
                                    duration-200
                                    hover:text-white

                                    lg:text-sm
                                "
                            >
                                About Us
                            </a>
                        </div>

                        {/* RIGHT MENU */}
                        <div className="flex items-center gap-3 sm:gap-4 lg:gap-8">
                            <a
                                href="#services"
                                className="
                                    text-xs
                                    font-medium
                                    text-white/90
                                    transition-colors
                                    duration-200
                                    hover:text-white

                                    lg:text-sm
                                "
                            >
                                Services
                            </a>

                            <a
                                href="#contact"
                                className="
                                    text-xs
                                    font-medium
                                    text-white/90
                                    transition-colors
                                    duration-200
                                    hover:text-white

                                    lg:text-sm
                                "
                            >
                                Contact
                            </a>
                        </div>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="
                            absolute
                            right-2
                            rounded-lg
                            p-2
                            text-white
                            transition-colors
                            hover:bg-white/10

                            sm:hidden
                        "
                        aria-label={
                            isOpen ? "Close menu" : "Open menu"
                        }
                        aria-expanded={isOpen}
                    >
                        {isOpen ? (
                            <X size={21} />
                        ) : (
                            <Menu size={21} />
                        )}
                    </button>
                </div>

                {/* MOBILE NAVIGATION */}
                {isOpen && (
                    <div
                        className="
                            border-t
                            border-white/10
                            px-3
                            pb-3
                            pt-2

                            sm:hidden
                        "
                    >
                        <div className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="
                                        rounded-lg
                                        px-3
                                        py-2.5
                                        text-sm
                                        font-medium
                                        text-white/90
                                        transition-colors
                                        hover:bg-white/10
                                        hover:text-white
                                    "
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}