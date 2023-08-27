'use client'
import { useState } from 'react';
import Gradient from '../ui/gradient';
import axios from 'axios';

const FileUpload = () => {
    const [namespace, setNamespace] = useState("");
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const apiEndpoint = '/api/ingest/file';

        // Create a new FormData object and append the file to it.
        const formData = new FormData();
        if (!file){
            return    
        }

        formData.append('file', file);   
        // Use Axios to send the file as a POST request with query parameters.
        await axios.post(apiEndpoint, formData, {
            params: {
                namespace: namespace,
                name: file.name,
                type: file.type,
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log('File uploaded successfully:', response.data);
                setIsFileUploaded(true);
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
        setIsFileUploaded(true);
    };
    const handleOnChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handleReset = () => {
        setNamespace("");
        setFile(null);
        setIsFileUploaded(false);
    };

    return (
        <>
            <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
                <div
                    className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                    data-wow-delay=".15s"
                >
                    <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                        Upload files!
                    </h2>
                    {isFileUploaded ? (
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
                                    <div className='mt-8'>
                                        <label
                                            htmlFor="file"
                                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                        >
                                            Select your file
                                        </label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleOnChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-4">
                                <button className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                                    Upload
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
export default FileUpload