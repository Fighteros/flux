"use client"

import {PropsWithChildren, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {useOnClickOutside} from "usehooks-ts";

type Props = PropsWithChildren<{
    triggerIcon: React.ReactNode;
    triggerClassName?: string
}>;

const SideBar = (props: Props) => {
    const [show, setShow] = useState(false);

    const ref = useRef<HTMLDivElement | any>(null);

    useOnClickOutside(ref, () => setShow(false))

    return (
        <>
            <button className={props.triggerClassName}
                    onClick={() => setShow((prev) => !prev)}>{props.triggerIcon}</button>
            <div ref={ref}
                 className={cn("w-60 duration-300 absolute top-0 z-10 transition-all bg-violet-900 rounded-r-md min-h-screen ", {
                     "-left-full": !show,
                     "left-0": show
                 })}>
                {props.children}
            </div>
        </>
    );
}
export default SideBar;