'use client'
import { useState } from 'react';
import Gradient from '../ui/gradient';
import axios from 'axios';

const FileDelete = () => {
    const [namespace, setNamespace] = useState("");
    const [source, setSource] = useState("");
    const [isFileRemoved, setIsFileRemoved] = useState(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const apiEndpoint = '/api/delete/file';

        // Use Axios to send the file as a POST request with query parameters.
        await axios.post(apiEndpoint, {}, {
            params: {
                namespace: namespace,
                source: source,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log('File deleted successfully:', response.data);
                setIsFileRemoved(true);
            })
            .catch((error) => {
                console.error('Error deleting file:', error);
            });
        setIsFileRemoved(true);
    };

    const handleReset = () => {
        setNamespace("");
        setSource("");
        setIsFileRemoved(false);
    };

    return (
        <>
            <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
                <div
                    className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                    data-wow-delay=".15s"
                >
                    <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                        Delete files!
                    </h2>
                    {isFileRemoved ? (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white shadow-lg rounded-lg px-8 py-6 text-center">
                                <h3 className="text-lg font-semibold mb-4 text-black">File successfully uploaded!</h3>
                                <button
                                    className="rounded-md bg-primary py-2 px-4 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80"
                                    onClick={handleReset}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    ) : null}
                    <form onSubmit={handleSubmit} action='form'>
                        <div className="-mx-4 flex flex-wrap">
                            <div className="w-full px-4 md:w-1/2">
                                <div className="mb-8">
                                    <label
                                        htmlFor="email"
                                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                    >
                                        Namespace
                                    </label>
                                    <input
                                        type="namespace"
                                        placeholder="Enter namespace"
                                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                        value={namespace}
                                        onChange={(e) => setNamespace(e.target.value)}
                                    />
                                </div>
                                <div className="mb-8">
                                    <label
                                        htmlFor="source"
                                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                    >
                                        Source
                                    </label>
                                    <input
                                        type="source"
                                        placeholder="Enter file source"
                                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                        value={source}
                                        onChange={(e) => setSource(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full px-4">
                                <button className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Gradient />
        </>
    )
}
export default FileDelete