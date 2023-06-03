/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        show: {
          "0%": {
            transform: "scale(0)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },

        hide: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(0)",
          },
        },

        up: {
          "0%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "show-animation": "show .1s ease-out forwards",
        "hide-animation": "hide 0.04s ease-in forwards",
        "up-animation": "up 0.1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
