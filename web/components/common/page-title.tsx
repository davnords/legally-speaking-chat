const PageTitle = ({
    header,
    emoji = '💬',
    hidden = '',
    subHeader,
    paragraph,
}: {
    header: string;
    emoji?: string;
    hidden?: string;
    subHeader: string;
    paragraph: string;
    maxWidth?: string;
}) => {
    return (
        <>
            <div className="max-w-[750px] text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="mr-2">{emoji}</span>{header}</h1>
                <h2 className="text-1xl md:text-3xl mb-3">{subHeader}<span className="md:hidden">{hidden}</span></h2>
                <h3 className="text-1xl hidden md:block">{paragraph}</h3>
            </div>
        </>
    );
};

export default PageTitle;
