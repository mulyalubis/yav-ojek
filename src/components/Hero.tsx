import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section
            id="home"
            className="
                relative
                min-h-140
                overflow-hidden

                sm:min-h-145

                lg:min-h-150
            "
        >
            {/* Background Image */}
            <img
                src="/assets/mobil-hero-2.webp"
                alt="Y Transport vehicle"
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                "
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/55" />

            {/* Content */}
            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-140
                    max-w-6xl
                    items-center
                    px-5
                    pt-24

                    sm:min-h-145
                    sm:px-8
                    sm:pt-24

                    lg:min-h-150
                    lg:px-10
                    lg:pt-20
                "
            >
                <div
                    className="
                        w-full
                        max-w-82.5
                        text-white

                        sm:max-w-2xl

                        lg:max-w-xl
                    "
                >
                    {/* Heading */}
                    <h1
                        className="
                            text-2xl
                            font-bold
                            leading-[1.15]

                            sm:text-4xl
                            sm:leading-tight

                            lg:text-6xl
                        "
                    >
                        Customer Satisfaction Is

                        <span className="flex text-blue-400">
                            Our Top Priority
                        </span>
                    </h1>

                    {/* Description + Button */}
                    <div
                        className="
                            mt-5
                            flex
                            flex-col
                            items-start
                            gap-5

                            sm:mt-6
                            sm:flex-row
                            sm:items-center
                            sm:gap-6

                            lg:mt-6
                        "
                    >
                        {/* Description */}
                        <p
                            className="
                                max-w-82.5
                                text-sm
                                leading-6
                                text-white/80

                                sm:max-w-100
                                sm:text-sm

                                lg:max-w-lg
                                lg:text-base
                            "
                        >
                            Good Comfort, Affordable Prices, Fast
                            Delivery, And Friendly Drivers Are What
                            All Customers Want.
                        </p>

                        {/* Button */}
                        <div className="shrink-0">
                            <a
                                href="#services"
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-lg
                                    bg-[#2563EB]
                                    px-4
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    shadow-blue-900/20
                                    transition-all
                                    duration-200
                                    hover:bg-[#1D4ED8]
                                    hover:shadow-xl

                                    sm:px-4
                                    sm:py-3
                                "
                            >
                                Order Now

                                <ArrowRight size={17} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}