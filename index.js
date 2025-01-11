const { crawlWebPage } = require("./crawl-website.js");
const { printReport } = require("./seo-report.js");



async function main() {

    // @desc: process.argv[0] = execPath of the environment Node.js
    // @desc: process.argv[1] = filePath of the file index.js

    if (process.argv.length < 3) {
        console.log("No command line argument provided as website link...");

        // @desc: exit the process with an error code of 1 and non-zero status
        process.exit(1);
    }

    if (process.argv.length > 3) {
        console.log("Too many command line arguments...");
        process.exit(1);
    }

    const baseURLInputArg = process.argv[2];
    console.log(`starting crawl on ${baseURLInputArg}`);

    const pages = await crawlWebPage(baseURLInputArg, baseURLInputArg, {});
    printReport(pages);

}

main();