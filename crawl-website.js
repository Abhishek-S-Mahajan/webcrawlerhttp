function normalizeURL(urlString) {
    const urlObject = new URL(urlString);
    const { hostname, pathname } = urlObject;
    const hostPath = `${hostname}${pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
        // everything except the last character
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = {
    normalizeURL
}