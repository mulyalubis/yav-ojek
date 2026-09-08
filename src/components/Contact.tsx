import {
    Mail,
    MapPin,
    Phone,
    Send,
} from "lucide-react";

export default function Contact() {
    return (
        <section
            id="contact"
            className="bg-[#F1F2F2] px-4 py-16 sm:px-6"
        >
            <div className="mx-auto max-w-6xl">

                {/* HEADING */}
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-normal leading-tight text-black sm:text-3xl">
                        Get In Touch
                    </h2>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500">
                        Do you have a problem or need help with our transportation services? Contact us and we’ll
                        be happy to assist you.
                    </p>
                </div>

                {/* CONTACT CONTAINER */}
                <div className="grid overflow-hidden rounded-xl bg-[#0B1954] md:grid-cols-2">

                    {/* LEFT - INFORMATION */}
                    <div className="p-6 text-white sm:p-8 bg-[url('/assets/mobil-contact.jpg')] bg-center bg-cover">
                        <h3 className="text-xl font-medium">
                            Contact Us
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
                            We are ready to help you with your
                            transportation needs. Feel free to
                            reach out to us.
                        </p>

                        <div className="mt-7 space-y-5">

                            {/* LOCATION */}
                            <div className="flex items-start gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#2563EB]">
                                    <MapPin size={17} />
                                </div>

                                <div>
                                    <p className="text-xs text-white/50">
                                        Address
                                    </p>

                                    <p className="mt-1 text-sm text-white/90">
                                        Banda Aceh, Indonesia
                                    </p>
                                </div>
                            </div>

                            {/* PHONE */}
                            <div className="flex items-start gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#2563EB]">
                                    <Phone size={17} />
                                </div>

                                <div>
                                    <p className="text-xs text-white/50">
                                        Phone
                                    </p>

                                    <p className="mt-1 text-sm text-white/90">
                                        +62 812 3456 7890
                                    </p>
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="flex items-start gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#2563EB]">
                                    <Mail size={17} />
                                </div>

                                <div>
                                    <p className="text-xs text-white/50">
                                        Email
                                    </p>

                                    <p className="mt-1 text-sm text-white/90">
                                        info@yktransport.com
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT - FORM */}
                    <div className="bg-[#F8FAFC] p-6 sm:p-8">
                        <h3 className="text-xl font-medium text-black">
                            Send Us a Message
                        </h3>

                        <div className="mt-5 space-y-4">

                            {/* NAME */}
                            <div>
                                <label className="mb-1.5 block text-xs text-gray-600">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-black outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label className="mb-1.5 block text-xs text-gray-600">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-black outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* MESSAGE */}
                            <div>
                                <label className="mb-1.5 block text-xs text-gray-600">
                                    Message
                                </label>

                                <textarea
                                    rows={4}
                                    placeholder="Write your message..."
                                    className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* BUTTON */}
                            <button
                                type="button"
                                className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#2563EB] text-sm text-white transition hover:bg-[#1D4ED8]"
                            >
                                <Send size={16} />
                                Send Message
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}