const { sortPages } = require("./seo-report.js");
const { test, expect } = require("@jest/globals");

// @desc: sort pages array tuples in descending order of qty 2
test("sortPages of qty 2", () => {
    const inputPagesObject = {
        "https://wagslane.dev/path": 1,
        "https://wagslane.dev": 3
    }
    const actualOutput = sortPages(inputPagesObject);
    const expectedOutput = [
        ["https://wagslane.dev", 3],
        ["https://wagslane.dev/path", 1],
    ];
    expect(actualOutput).toEqual(expectedOutput);
});

// @desc: sort pages array tuples in descending order of qty 5
test("sortPages of qty 5", () => {
    const inputPagesObject = {
        "https://wagslane.dev/path1": 1,
        "https://wagslane.dev": 3,
        "https://wagslane.dev/path2": 5,
        "https://wagslane.dev/path3": 2,
        "https://wagslane.dev/path4": 9
    }
    const actualOutput = sortPages(inputPagesObject);
    const expectedOutput = [
        ["https://wagslane.dev/path4", 9],
        ["https://wagslane.dev/path2", 5],
        ["https://wagslane.dev", 3],
        ["https://wagslane.dev/path3", 2],
        ["https://wagslane.dev/path1", 1]
    ];
    expect(actualOutput).toEqual(expectedOutput);
});