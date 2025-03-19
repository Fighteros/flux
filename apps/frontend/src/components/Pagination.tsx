import {calcPageNums} from "@/lib/utils/helpers";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";

type Props = {
    totalPages: number,
    currentPage: number,
    pageNeighbours?: number,
    className?: string
};

const Pagination = ({totalPages, currentPage, pageNeighbours = 2, className}: Props) => {
    const pageNumbers = calcPageNums({totalPages, currentPage, pageNeighbours})
    return (
        <div className={cn("flex items-center justify-center gap-2", className)}>
            {/*  previous page button  */}
            {currentPage !== 1 && (<button className={cn("rounded-md bg-slate-200 py-2 px-2")}>
                    <Link href={`/?page=${currentPage - 1}`}>
                        <ChevronLeftIcon className="w-4"/>
                    </Link>
                </button>
            )}
            {pageNumbers.map((page, index) => (
                <button key={index} className={cn("px-3 py-1 rounded-md transition hover:text-fuchsia-600", {
                    "bg-slate-200": currentPage !== page && page !== "...",
                    "bg-violet-500 text-white ": currentPage == page,
                    "cursor-not-allowed":page === "..."
                })}>
                    {page === "..." ? <span>...</span> :
                        <Link href={`/?page=${page}`}>{page}</Link>}
                </button>))}
            {/*  next page button    */}
            {currentPage !== totalPages && <button className={cn("rounded-md bg-slate-200 py-2 px-2")}>
                <Link href={`/?page=${currentPage + 1}`}>
                    <ChevronRightIcon className="w-4"/>
                </Link>
            </button>}
        </div>
    );
}
export default Pagination;