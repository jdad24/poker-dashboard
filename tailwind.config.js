// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  corePlugins: {
    preflight: false, // Disable Tailwind's preflight
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
