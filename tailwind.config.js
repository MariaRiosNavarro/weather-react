/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00A9FF",

          secondary: "#362FD9",

          accent: "#540375",

          neutral: "#071952",

          "base-100": "#CDF5FD",

          info: "#ACFADF",

          success: "#36d399",

          warning: "#fbbd23",

          error: "#f87272",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
      "night",
      "aqua",
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
