import Link from "next/link";
import {WaveDiv} from "../../icons/icons";
import {ArrowRightEndOnRectangleIcon} from "@heroicons/react/16/solid";

const Hero = () => (
    // outer container
    <div className="bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white pt-24">
        <div className="container mx-auto flex flex-col md:flex-row items-center flex-wrap px-5">
            {/* left col */}
            <div className="flex flex-col w-full justify-center items-start md:w-2/5 text-center md:text-left">
                <p className="capitalize tracking-wide w-full ">
                    Explore insights, tutorials, and stories for curious minds like yours
                </p>
                <h2 className="my-5 text-5xl font-bold leading-tight">
                    Welcome to Flux Blog
                </h2>
                <p className="capitalize leading-normal text-2xl">
                    Join the community of millions of people who learn, share, and grow together.{" "}
                </p>

                Login Button
                <div className="flex items-center justify-center mt-12 text-center ">
                    <Link className="pr-4" href="/auth/signup">
                        <button
                            className="flex flex-grow items-center font-bold justify-center p-2 transition-all duration-300 ease-in-out w-[250px] h-[60px]
                        rounded-4xl bg-gradient-to-br from-[#feb692]
                        to-[#ea5455] shadow-[0_20px_30px_-6px_rgba(238,103,97,0.5)]
                       outline-none cursor-pointer border-none text-2xl text-white hover:translate-y-[2px]
                        hover:shadow-none active:opacity-50">
                            Sign up
                            <ArrowRightEndOnRectangleIcon className="w-10 pt-1 pl-1 text-violet-500"/>
                        </button>
                    </Link>
                </div>


            </div>
            {/* right col  */}
            <div className="w-full flex justify-center md:w-3/5 py-7 text-center">
                <img src="/hero.jpg" alt="hero-img" className="w-4/5 md:w-3/5 rounded-3xl"/>
            </div>
        </div>

        <div className="relative -mt-10 lg:-mt-24">
            <WaveDiv/>
        </div>
    </div>
);

export default Hero;