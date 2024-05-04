/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // or other file paths/patterns if your project structure is different
    ],
    theme: {
      extend: {
        colors: {
          reddit: {
            dark: '#030303', // Reddit dark background color
            light: '#dae0e6', // Reddit light background color
            blue: '#5b92fa', // Reddit blue color
            // Add other colors used by Reddit as needed
          },
        },
        fontFamily: {
          sans: ['IBM Plex Sans', 'sans-serif'], // Reddit seems to use IBM Plex Sans
          // Add other font families if you know Reddit uses them
        },
        // Add any other theme customizations here
      },
    },
    plugins: [],
  }
  


