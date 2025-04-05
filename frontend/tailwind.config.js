/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', // For React project
    './public/index.html',        // For static HTML files
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#3B82F6", // blue-500
          secondary: "#10B981", // green-500
          accent: "#8B5CF6", // purple-500
          neutral: "#1F2937", // gray-800
          "base-100": "#FFFFFF", // white
          info: "#3ABFF8", // default light blue
          success: "#36D399", // default green
          warning: "#FBBD23", // default yellow
          error: "#F87272", // default red
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#60A5FA", // blue-400
          secondary: "#34D399", // green-400
          accent: "#A78BFA", // purple-400
          neutral: "#111827", // gray-900
          "base-100": "#1F2937", // gray-800
          info: "#3ABFF8", // default light blue
          success: "#36D399", // default green
          warning: "#FBBD23", // default yellow
          error: "#F87272", // default red
        },
      },
    ],
  },
}

