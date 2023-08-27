import Gradient from "../ui/gradient";

const PageContainer = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    return (
        <>
            <section className="container flex flex-col items-center z-10 overflow-hidden pb-16 md:pb-20 pt-24 lg:pt-[200px] lg:pb-28 max-w-[1280px]">
                {children}
                <Gradient />
            </section >
        </>
    );
};

export default PageContainer;
