import {PropsWithChildren} from "react";
import SideBar from "@/components/ui/SideBar";
import {Bars3Icon} from "@heroicons/react/16/solid";

type Props = PropsWithChildren;

const MobileNav = (props: Props) => {
    return (
        <div className="md:hidden">
            <SideBar triggerIcon={<Bars3Icon className="w-4"/>}
                     triggerClassName="absolute top-2 left-2"
            >
                {props.children}
            </SideBar>
        </div>
    );
}
export default MobileNav;