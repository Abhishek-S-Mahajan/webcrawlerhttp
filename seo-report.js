
function printReport(pages) {
    console.log("==========");
    console.log("START REPORT");
    console.log("==========");
    const sortedPages = sortPages(pages);
    sortedPages.forEach((sortedPage) => {
        const url = sortedPage[0];
        const hits = sortedPage[1];
        console.log(`Found ${hits} links to the URL ${url}.`)
    });
    console.log("==========");
    console.log("END REPORT");
    console.log("==========");
}


// @desc: sort the pages object as array tuples in descending order, from most crawled to least crawled
function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        aHits = a[1];
        bHits = b[1];
        return b[1] - a[1];
    });
    return pagesArr;
}











module.exports = {
    printReport,
    sortPages
}