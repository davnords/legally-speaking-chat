import Image from "next/image";

export type Brand = {
    id: number;
    name: string;
    href: string;
    image: string;
};

const brandsData: Brand[] = [
    {
        id: 1,
        name: "OpenAI",
        href: "https://openai.com",
        image: "/images/brands/open-ai-logo.png",
    },
    {
        id: 2,
        name: "Langchain",
        href: "https://blog.langchain.dev",
        image: "/images/brands/langchain-logo.png",
    },
    {
        id: 3,
        name: "NextJS",
        href: "https://nextjs.org",
        image: "/images/brands/next-js-logo.png",
    },
    {
        id: 4,
        name: "Pinecone",
        href: "https://www.pinecone.io",
        image: "/images/brands/pinecone-logo.png",
    },
    {
        id: 5,
        name: "Prisma",
        href: "https://www.prisma.io",
        image: "/images/brands/prisma-logo.svg",
    },
];

const Brands = () => {
    return (
        <section className="pt-16">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="text-center text-base font-medium !leading-relaxed text-body-color dark:text-white sm:text-lg md:text-xl">
                            Powered by trusted brands
                        </div>
                        <div
                            className="bg-transparent wow fadeInUp flex flex-wrap items-center justify-center rounded-md py-8 px-8 dark:bg-opacity-5 sm:px-10 md:py-[40px] md:px-[50px] xl:p-[5px] 2xl:py-[60px] 2xl:px-[70px]"
                            data-wow-delay=".1s
                "
                        >
                            {brandsData.map((brand) => (
                                <SingleBrand key={brand.id} brand={brand} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
    const { href, image, name } = brand;

    return (
        <div className="mx-3 flex w-full max-w-[160px] items-center justify-center py-[15px] sm:mx-4 lg:max-w-[130px] xl:mx-6 xl:max-w-[150px] 2xl:mx-8 2xl:max-w-[160px]">
            <a
                href={href}
                target="_blank"
                rel="nofollow noreferrer"
                className="relative h-10 w-full opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:hover:opacity-100"
            >
                <Image src={image} alt={name} fill />
            </a>
        </div>
    );
};
