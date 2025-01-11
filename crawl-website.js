// @desc: since we don't have access to the DOM in the node environment
const { JSDOM } = require("jsdom");


// @desc: crawl the website where,
// baseURL = homepage of the website,
// currentURL = current page that we're crawling
// pages = an object that keeps track of all the pages we've tracked so far
// for example: "https://wagslane.dev/"
async function crawlWebPage(baseURL, currentURL, pages) {

    const baseURLObject = new URL(baseURL);
    const currentURLObject = new URL(currentURL);

    // @desc: ignore the URLs pointing towards external sites other than the main host site
    if (baseURLObject.hostname !== currentURLObject.hostname) {
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL);

    // @desc: if we've already crawled the current URL, then increment the count we've seen this page
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++;
        return pages;
    }

    pages[normalizedCurrentURL] = 1;

    console.log(`Actively crawling ${currentURL}...`);



    try {

        const resp = await fetch(currentURL);

        //@desc: check for response status code
        if (resp.status > 399) {
            console.error(`Error in fetching the "${currentURL}" URL with the status code: `, resp.status);
            return pages;
        }

        // @desc: check for response header to only parse "text/html" body
        const contentType = resp.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.error(`Error in fetching the "${currentURL}" URL. Non-HTML response: `, contentType);
            return pages;
        }


        // @desc: parse text/html response body
        const htmlBody = await resp.text();

        const nextURLs = getURLs(htmlBody, baseURL);
        for (let nextURL of nextURLs) {
            pages = await crawlWebPage(baseURL, nextURL, pages);
        }

    } catch (error) {
        console.error(`Error in fetching the "${currentURL}" URL:`, error.message);

    }

    return pages;

}



// @desc: get all the URLs present in the given HTML web page and return an array of URL strings
function getURLs(htmlBody, baseURL) {
    const urls = [];

    // @desc: creates DOM tree structure from the HTML string
    const domObject = new JSDOM(htmlBody);

    // @desc: returns a node list of all link elements
    const linkElementsList = domObject.window.document.querySelectorAll("a");

    linkElementsList.forEach(({ href }) => {


        if (href.slice(0, 1) === "/") {
            try {

                // @desc: this a relative URL
                const urlObject = new URL(`${baseURL}${href}`);
                urls.push(urlObject.href);

            } catch (error) {
                console.error("Error with Relative URL:", error.message);

            }

        } else {
            try {

                // @desc: this is an absolute URL
                const urlObject = new URL(href);
                urls.push(urlObject.href);

            } catch (error) {
                console.error("Error with Absolute URL:", error.message);

            }
        }

    });


    return urls;
}



// @desc: normalize the URL of the website
function normalizeURL(urlString) {
    const urlObject = new URL(urlString);
    const { hostname, pathname } = urlObject;
    const hostPath = `${hostname}${pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
        // @desc: everything except the last character
        return hostPath.slice(0, -1);
    }
    return hostPath;
}









module.exports = {
    crawlWebPage,
    normalizeURL,
    getURLs
}