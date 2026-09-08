const aboutImages = [
    {
        src: "/assets/mobil-hero-2.webp",
        alt: "Y Transport city",
    },
    {
        src: "/assets/honda-hero.webp",
        alt: "Y Transport vehicle",
    },
    {
        src: "/assets/honda-hero-2.webp",
        alt: "Y Transport car",
    },
    {
        src: "/assets/mobil-hero-4.webp",
        alt: "Y Transport driver",
    },
];

export default function About() {
    return (
        <section id="about" className="bg-[#0B1954] py-20 sm:py-24">
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

                    {/* Image Gallery */}
                    <div className="grid grid-cols-2 gap-4">
                        {aboutImages.map((image) => (
                            <div
                                key={image.src}
                                className="group overflow-hidden rounded-xl"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="aspect-4/3 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="text-white flex flex-col items-center justify-center">
                        <p className="mb-2 text-2xl font-semibold uppercase text-blue-300 text-center">
                            About Us
                        </p>

                        <p className="text-lg leading-7 text-white/70 text-justify">
                            YK Transport is a modern transportation service provider
                            dedicated to redefining the standard of comfort and
                            hospitality in your travel experience. Born from a deep understanding of the concerns of
                            transportation service users, we provide reliable,
                            comfortable, and affordable transportation for every journey. From standard fleets and friendly drivers to executive-class
                            travel, we offer a real solution for your transportation needs.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}