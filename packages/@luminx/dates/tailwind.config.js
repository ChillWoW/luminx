/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {}
        }
    },
    safelist: ["w-80"],
    plugins: [require("tailwind-scrollbar")({ nocompatible: true })]
};
