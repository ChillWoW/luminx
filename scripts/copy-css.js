const fs = require("fs");
const path = require("path");

function copyCSS(packagePath) {
    // If no package path provided, assume we're running from a package directory
    // and need to go up to find the package
    if (!packagePath) {
        // Check if we're in a package directory by looking for package.json
        const currentDir = process.cwd();
        if (fs.existsSync(path.join(currentDir, "package.json"))) {
            packagePath = currentDir;
        } else {
            packagePath = "packages/@luminx/core";
        }
    }

    // If packagePath is relative and doesn't start with packages/,
    // assume it's an absolute path or relative to current working directory
    let resolvedPackagePath;
    if (path.isAbsolute(packagePath)) {
        resolvedPackagePath = packagePath;
    } else if (packagePath.startsWith("packages/")) {
        // Path relative to root
        resolvedPackagePath = path.resolve(packagePath);
    } else {
        // Assume it's the current directory or relative to it
        resolvedPackagePath = path.resolve(packagePath);
    }

    const srcDir = path.join(resolvedPackagePath, "src");
    const distDir = path.join(resolvedPackagePath, "dist");

    console.log(`Looking for CSS files in: ${srcDir}`);
    console.log(`Will copy to: ${distDir}`);

    if (!fs.existsSync(srcDir)) {
        console.error(`Source directory does not exist: ${srcDir}`);
        process.exit(1);
    }

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

// Allow package path to be passed as argument
const packagePath = process.argv[2];
copyCSS(packagePath);
