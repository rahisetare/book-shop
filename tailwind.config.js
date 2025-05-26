/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // For app directory
    "./pages/**/*.{js,ts,jsx,tsx}", // For pages directory (if you're using it)
    "./components/**/*.{js,ts,jsx,tsx}", // For components directory (if you're using it)
    "./public/**/*.{html,js}", // For any other HTML or JS files in public folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
