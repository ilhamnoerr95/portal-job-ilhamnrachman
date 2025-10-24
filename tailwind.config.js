// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cta: {
          bg: "#000000B8", //
        },
        primary: {
          DEFAULT: "#01959F",
          foreground: "#FFFFFF",
        },
      },
      boxShadow: {
        bottom: "0 4px 6px -1px rgba(0,0,0,0.1)",
        "bottom-lg": "0 8px 15px -3px rgba(0,0,0,0.1)",
      },
    },
  },
};
