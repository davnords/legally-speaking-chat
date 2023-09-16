'use client'
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation'

const SigninPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl')?.toString() as string ?? "/";

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;

        try {
            await signIn("email", { email, callbackUrl: `${window.location.origin}${callbackUrl}` });
        } catch (error) {
            setErrorMessage("Oops, something went wrong");
        }
    };

    if (session) {
        return (
            <>
                <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
                    <div className="container">
                        <div className="-mx-4 flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                                    <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                        Sign in successful!
                                    </h3>
                                    <p className="mb-11 text-center text-base font-medium text-body-color">
                                        Welcome back!
                                    </p>
                                    <button onClick={() => {
                                        window.location.href = '/';
                                    }} className="flex w-full items-center justify-center rounded-md bg-white p-3 text-base font-medium text-body-color shadow-one hover:text-primary dark:bg-[#242B51] dark:text-body-color dark:shadow-signUp dark:hover:text-white">
                                        Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
    else {
        return (
            <>
                <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
                    <div className="container">
                        <div className="-mx-4 flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="mx-auto max-w-[500px] rounded-md bg-neutral-500	bg-opacity-5 py-10 px-6 sm:p-[60px]">
                                    <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                        Logga in på ditt konto
                                    </h3>
                                    <p className="mb-11 text-center text-base font-medium text-body-color">
                                        Logga in för en mer smidig användarupplevelse.
                                    </p>
                                    <button onClick={() => signIn("google", { callbackUrl: `${window.location.origin}${callbackUrl}` })} className="mb-6 flex w-full items-center justify-center rounded-md bg-white p-3 text-base font-medium text-body-color shadow-one hover:text-primary dark:bg-[#242B51] dark:text-body-color dark:shadow-signUp dark:hover:text-white">
                                        <span className="mr-3">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clip-path="url(#clip0_95:967)">
                                                    <path
                                                        d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                                                        fill="#4285F4"
                                                    />
                                                    <path
                                                        d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                                                        fill="#34A853"
                                                    />
                                                    <path
                                                        d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                                                        fill="#FBBC05"
                                                    />
                                                    <path
                                                        d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                                                        fill="#EB4335"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_95:967">
                                                        <rect width="20" height="20" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                        Logga in med Google
                                    </button>

                                    <button onClick={() => signIn("github", { callbackUrl: `${window.location.origin}${callbackUrl}` })} className="mb-6 flex w-full items-center justify-center rounded-md bg-white p-3 text-base font-medium text-body-color shadow-one hover:text-primary dark:bg-[#242B51] dark:text-body-color dark:shadow-signUp dark:hover:text-white">
                                        <span className="mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        </span>
                                        Logga in med GitHub
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
};

export default SigninPage;
