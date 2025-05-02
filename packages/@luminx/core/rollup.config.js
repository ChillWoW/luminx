const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const dts = require("rollup-plugin-dts");
const postcss = require("rollup-plugin-postcss");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

const packageJson = require("./package.json");

module.exports = [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true
            }
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            postcss({
                extract: true,
                modules: false,
                inject: false,
                minimize: true,
                plugins: [tailwindcss(), autoprefixer()]
            })
        ]
    },
    {
        input: "dist/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "es" }],
        plugins: [dts()],
        external: [/\.css$/]
    }
];
