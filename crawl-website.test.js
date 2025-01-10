const { normalizeURL, getURLs } = require("./crawl-website.js");
const { test, expect } = require("@jest/globals");

// @desc: get rid of the "https://" protocol
test("normalizeURL strip the https protocol", () => {
    const input = "https://blog.boot.dev/path";
    const actualOutput = normalizeURL(input);
    const expectedOutput = "blog.boot.dev/path";
    expect(actualOutput).toEqual(expectedOutput);
});

// @desc: get rid of the "http://" protocol
test("normalizeURL strip the https protocol", () => {
    const input = "http://blog.boot.dev/path";
    const actualOutput = normalizeURL(input);
    const expectedOutput = "blog.boot.dev/path";
    expect(actualOutput).toEqual(expectedOutput);
});

// @desc: get rid of the trailing backslash at the end of the url
test("normalizeURL strip the last backslash", () => {
    const input = "https://blog.boot.dev/path/";
    const actualOutput = normalizeURL(input);
    const expectedOutput = "blog.boot.dev/path";
    expect(actualOutput).toEqual(expectedOutput);
});

// @desc: take care of the capitals
test("normalizeURL take care of the capitals", () => {
    const input = "https://BLOG.boot.dev/path/";
    const actualOutput = normalizeURL(input);
    const expectedOutput = "blog.boot.dev/path";
    expect(actualOutput).toEqual(expectedOutput);
});

// @desc: get all the URLs present in the HTML web page and return an array of URL strings
// @desc: Absolute URL
test("getAbsoluteURL in the HTML", () => {
    const htmlBodyInput = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">Blogs</a>
        </body>
    </html>
    `;
    const baseURLInput = "https://blog.boot.dev";
    const actualOutput = getURLs(htmlBodyInput, baseURLInput);
    const expectedOutput = ["https://blog.boot.dev/path/"];
    expect(actualOutput).toEqual(expectedOutput);
});

// @desc: Relative URL
test("getRelativeURL in the HTML", () => {
    const htmlBodyInput = `
    <html>
        <body>
            <a href="/path/">Blogs</a>
        </body>
    </html>
    `;
    const baseURLInput = "https://blog.boot.dev";
    const actualOutput = getURLs(htmlBodyInput, baseURLInput);
    const expectedOutput = ["https://blog.boot.dev/path/"];
    expect(actualOutput).toEqual(expectedOutput);
});

// @desc: multiple URLs (both relative and absolute)
test("getMultipleURLs in the HTML", () => {
    const htmlBodyInput = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">Blogs Path 1 (Absolute Link)</a>
            <a href="/path2/">Blogs Path 2 (Relative Link)</a>
        </body>
    </html>
    `;
    const baseURLInput = "https://blog.boot.dev";
    const actualOutput = getURLs(htmlBodyInput, baseURLInput);
    const expectedOutput = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
    expect(actualOutput).toEqual(expectedOutput);
});

// @desc: exclude invalid URL
test("excludeInvalidURLs in the HTML", () => {
    const htmlBodyInput = `
    <html>
        <body>
            <a href="invalid">Invalid URL Link</a>
        </body>
    </html>
    `;
    const baseURLInput = "https://blog.boot.dev";
    const actualOutput = getURLs(htmlBodyInput, baseURLInput);
    const expectedOutput = [];
    expect(actualOutput).toEqual(expectedOutput);
});

