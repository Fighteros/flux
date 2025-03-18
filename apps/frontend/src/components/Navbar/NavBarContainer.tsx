import {PropsWithChildren} from "react";
import Navbar from "@/components/Navbar/Navbar";
import MobileNav from "@/components/Navbar/MobileNav";

type Props = PropsWithChildren;

const NavBarContainer = (props: Props) => {
    return (
        <div className="relative">
            <Navbar>{props.children}</Navbar>
            <MobileNav>{props.children}</MobileNav>
        </div>
    );
}
export default NavBarContainer;