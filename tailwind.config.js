/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#181C24",
        steel: "#7C9CC0",
        powder: "#B7D3E0",
        cream: "#F3E3D3",
        sand: "#CBBBA3",
        paper: "#FBF7F1",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grain": "url('/images/noise.png')",
      },
    },
  },
  plugins: [],
};
