window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if(element) element.innerText = text
    };

    for (const dependency of ["chrom", "node", "electron"]) {
        replaceText(`${dependency}-version`, process.version[dependency])
    }
})