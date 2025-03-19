"use client"

import  {PropsWithChildren, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = PropsWithChildren

const Navbar = (props: Props) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => setScrollPosition(window.scrollY);

    const pathName = usePathname()


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, []);

    const isScrolledDown = scrollPosition > 10;

    const isHome = pathName === "/";
    return (
        <nav className={cn("hidden fixed w-full z-30 text-yellow-500 text-xl top-0 md:block", {
            // "backdrop-blur-md text-violet-600 shadow-md": isScrolledDown || !isHome
            "backdrop-blur-md backdrop-brightness-75 bg-violet-500/30 text-yellow-500 shadow-md": isScrolledDown || !isHome
        })}>
            <div className="flex items-center px-4 py-4 container">
                {props.children}
            </div>
        </nav>
    );
}
export default Navbar;