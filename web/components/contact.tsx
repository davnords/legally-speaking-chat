"use client"
import { useState } from "react";
import Gradient from '@/components/ui/gradient';


const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const formData = {
            email,
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsEmailSent(true);
            } else {
                setIsEmailSent(false);
            }
        } catch (error) {
            console.error("Error:", error);
            setIsEmailSent(false);
        }
    };

    const handleReset = () => {
        setName("");
        setEmail("");
        setMessage("");
        setIsEmailSent(false);
    };

    return (
        <>
            <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
                            <div
                                className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                                data-wow-delay=".15s"
                            >
                                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    Join the waiting list!
                                </h2>
                                <p className="mb-12 text-base font-medium text-body-color">
                                    We will contact you and provide personalized service to ensure a smooth integration to your website.
                                </p>
                                {isEmailSent ? (
                                    <div className="fixed inset-0 flex items-center justify-center z-50">
                                        <div className="bg-white shadow-lg rounded-lg px-8 py-6 text-center">
                                            <h3 className="text-lg font-semibold mb-4 text-black">Email registered successfully!</h3>
                                            <button
                                                className="rounded-md bg-primary py-2 px-4 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80"
                                                onClick={handleReset}
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </div>
                                ) : null}
                                <form onSubmit={handleSubmit}>
                                    <div className="-mx-4 flex flex-wrap">
                                        <div className="w-full px-4 md:w-1/2">
                                            <div className="mb-8">
                                                <label
                                                    htmlFor="email"
                                                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                                >
                                                    Your Email
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full px-4">
                                            <button className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Gradient />
        </>
    );
};
export default Contact;
