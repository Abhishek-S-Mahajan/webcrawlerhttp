const { normalizeURL } = require("./crawl-website.js");
const { test, expect } = require("@jest/globals");

// @desc: get rid of the protocol
test("normalizeURL strip the protocol", () => {
    const input = "https://blog.boot.dev/path";
    const actualOutput = normalizeURL(input);
    const expectedOutput = "blog.boot.dev/path";
    expect(actualOutput).toEqual(expectedOutput);
});


// @desc: get rid of the trailing backslash
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