export function calcPageNums({pageNeighbours, currentPage, totalPages}: {
    pageNeighbours: number,
    totalPages: number,
    currentPage: number
}) {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
        const startPage = Math.max(2, currentPage - pageNeighbours);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

        let pages: (number | string)[] = Array.from({
            length: endPage - startPage + 1

        }, (_, i) => startPage + i);

        if (startPage > 2) pages = ["...", ...pages]
        if (endPage < totalPages - 1) pages = [...pages, "..."]

        return [1, ...pages, totalPages];
    }

    return Array.from({length: totalPages}, (_, i) => i + 1);

}