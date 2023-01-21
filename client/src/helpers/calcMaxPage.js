export const calcMaxPage = (maxPage, limit = 4) => {
    const maxPageRound = Math.round(maxPage / limit);
    const maxPageFloat = maxPage / limit;
    if (maxPageRound < maxPageFloat) return (maxPageRound + 1);
    else return (maxPageRound);
};