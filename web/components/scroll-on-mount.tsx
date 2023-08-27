import { useEffect, useRef } from "react";

export default function ScrollOnMount({ children }: any) {
    const scrollToRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        scrollToRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [])

    return <div ref={scrollToRef}>{children}</div>
}