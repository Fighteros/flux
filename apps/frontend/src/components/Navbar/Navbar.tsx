"use client"

import {PropsWithChildren, useEffect, useState} from "react";
import {cn} from "@/lib/utils";

type Props = PropsWithChildren

const Navbar = (props: Props) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => setScrollPosition(window.scrollY);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, []);

    const isScrolledDown = scrollPosition > 10;

    return (
        <nav className={cn("hidden fixed w-full z-30 text-[#FFB200] text-xl top-0 md:block", {
            "bg-sky/20 backdrop-blur-md text-white shadow-md": isScrolledDown
        })}>
            <div className="flex items-center px-4 py-4 container">
                {props.children}
            </div>
        </nav>
    );
}
export default Navbar;