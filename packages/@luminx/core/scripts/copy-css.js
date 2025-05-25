const fs = require("fs");
const path = require("path");

function copyCSS() {
    const srcDir = "src";
    const distDir = "dist";

    function findCSSFiles(dir) {
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                findCSSFiles(filePath);
            } else if (
                file.endsWith(".css") &&
                !file.includes("style.css") &&
                !file.includes("tailwind-vars.css")
            ) {
                const relativePath = path.relative(srcDir, filePath);
                const componentDir = path.dirname(relativePath);
                const destDir = path.join(distDir, componentDir);

                // Create destination directory if it doesn't exist
                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir, { recursive: true });
                }

                // Copy the CSS file
                const destFile = path.join(destDir, file);
                fs.copyFileSync(filePath, destFile);
                console.log(`Copied ${filePath} to ${destFile}`);
            }
        });
    }

    findCSSFiles(srcDir);
}

copyCSS();
