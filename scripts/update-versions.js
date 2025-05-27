const fs = require("fs");
const path = require("path");

/**
 * Updates versions for all @luminx packages
 * Usage: node scripts/update-versions.js [version|increment-type]
 *
 * Examples:
 * - node scripts/update-versions.js 2.1.0        # Set specific version
 * - node scripts/update-versions.js patch        # Increment patch version
 * - node scripts/update-versions.js minor        # Increment minor version
 * - node scripts/update-versions.js major        # Increment major version
 * - node scripts/update-versions.js prerelease   # Increment prerelease version
 */

const PACKAGES_DIR = path.resolve("packages/@luminx");

function parseVersion(version) {
    const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
    if (!match) {
        throw new Error(`Invalid version format: ${version}`);
    }

    return {
        major: parseInt(match[1]),
        minor: parseInt(match[2]),
        patch: parseInt(match[3]),
        prerelease: match[4] || null
    };
}

function formatVersion(versionObj) {
    let version = `${versionObj.major}.${versionObj.minor}.${versionObj.patch}`;
    if (versionObj.prerelease) {
        version += `-${versionObj.prerelease}`;
    }
    return version;
}

function incrementVersion(currentVersion, incrementType) {
    const parsed = parseVersion(currentVersion);

    switch (incrementType) {
        case "major":
            parsed.major++;
            parsed.minor = 0;
            parsed.patch = 0;
            parsed.prerelease = null;
            break;
        case "minor":
            parsed.minor++;
            parsed.patch = 0;
            parsed.prerelease = null;
            break;
        case "patch":
            parsed.patch++;
            parsed.prerelease = null;
            break;
        case "prerelease":
            if (parsed.prerelease) {
                const prereleaseMatch =
                    parsed.prerelease.match(/^(.+?)\.?(\d+)$/);
                if (prereleaseMatch) {
                    const prefix = prereleaseMatch[1];
                    const number = parseInt(prereleaseMatch[2]);
                    parsed.prerelease = `${prefix}.${number + 1}`;
                } else {
                    parsed.prerelease = `${parsed.prerelease}.1`;
                }
            } else {
                parsed.patch++;
                parsed.prerelease = "pre.1";
            }
            break;
        default:
            throw new Error(`Invalid increment type: ${incrementType}`);
    }

    return formatVersion(parsed);
}

function getAllPackages() {
    if (!fs.existsSync(PACKAGES_DIR)) {
        throw new Error(`Packages directory not found: ${PACKAGES_DIR}`);
    }

    const packages = [];
    const packageDirs = fs.readdirSync(PACKAGES_DIR);

    for (const dir of packageDirs) {
        const packagePath = path.join(PACKAGES_DIR, dir);
        const packageJsonPath = path.join(packagePath, "package.json");

        if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(
                fs.readFileSync(packageJsonPath, "utf8")
            );
            packages.push({
                name: packageJson.name,
                path: packagePath,
                packageJsonPath,
                packageJson
            });
        }
    }

    return packages;
}

function updatePackageVersions(newVersion, packages) {
    const packageNames = packages.map((pkg) => pkg.name);

    for (const pkg of packages) {
        console.log(
            `Updating ${pkg.name} from ${pkg.packageJson.version} to ${newVersion}`
        );

        pkg.packageJson.version = newVersion;

        if (pkg.packageJson.peerDependencies) {
            for (const depName of Object.keys(
                pkg.packageJson.peerDependencies
            )) {
                if (packageNames.includes(depName)) {
                    const currentDep =
                        pkg.packageJson.peerDependencies[depName];
                    // Keep the version constraint prefix (>=, ^, ~, etc.)
                    const prefix = currentDep.match(/^[^\d]*/)[0];
                    pkg.packageJson.peerDependencies[
                        depName
                    ] = `${prefix}${newVersion}`;
                    console.log(
                        `  Updated peer dependency ${depName} to ${prefix}${newVersion}`
                    );
                }
            }
        }

        if (pkg.packageJson.dependencies) {
            for (const depName of Object.keys(pkg.packageJson.dependencies)) {
                if (packageNames.includes(depName)) {
                    const currentDep = pkg.packageJson.dependencies[depName];
                    const prefix = currentDep.match(/^[^\d]*/)[0];
                    pkg.packageJson.dependencies[
                        depName
                    ] = `${prefix}${newVersion}`;
                    console.log(
                        `  Updated dependency ${depName} to ${prefix}${newVersion}`
                    );
                }
            }
        }

        fs.writeFileSync(
            pkg.packageJsonPath,
            JSON.stringify(pkg.packageJson, null, 4) + "\n"
        );
    }
}

function main() {
    const versionArg = process.argv[2];

    if (!versionArg) {
        console.error(
            "Usage: node scripts/update-versions.js [version|increment-type]"
        );
        console.error("Examples:");
        console.error("  node scripts/update-versions.js 2.1.0");
        console.error("  node scripts/update-versions.js patch");
        console.error("  node scripts/update-versions.js minor");
        console.error("  node scripts/update-versions.js major");
        console.error("  node scripts/update-versions.js prerelease");
        process.exit(1);
    }

    try {
        const packages = getAllPackages();

        if (packages.length === 0) {
            console.log("No packages found in packages/@luminx");
            return;
        }

        console.log(`Found ${packages.length} packages:`);
        packages.forEach((pkg) => {
            console.log(`  - ${pkg.name} (${pkg.packageJson.version})`);
        });
        console.log();

        let newVersion;

        if (versionArg.match(/^\d+\.\d+\.\d+/)) {
            newVersion = versionArg;
        } else {
            const baseVersion = packages[0].packageJson.version;
            newVersion = incrementVersion(baseVersion, versionArg);
        }

        console.log(`Updating all packages to version: ${newVersion}\n`);

        updatePackageVersions(newVersion, packages);

        console.log("\n✅ Version update completed successfully!");
        console.log(`All packages are now at version ${newVersion}`);
    } catch (error) {
        console.error("❌ Error updating versions:", error.message);
        process.exit(1);
    }
}

main();
