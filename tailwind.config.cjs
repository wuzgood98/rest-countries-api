/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    
    extend: {
      colors: {
        darkBlue: 'hsl(209, 23%, 22%)',
        /* Dark Mode Background */
        veryDarkBlueDM: 'hsl(207, 26%, 17%)',
        /* Light Mode Text */
        veryDarkBlueLMT: 'hsl(200, 15%, 8%)',
        /* Light Mode Input */
        darkGray: 'hsl(0, 0%, 52%)',
        /* Light Mode Background */
        veryLightGray: 'hsl(0, 0%, 98%)',
        /* Dark Mode Text and Light Mode Element */
        white: 'hsl(0, 0%, 100%)',
        offWhite: '#e1e1e1'
      },
      fontFamily: {
        nunitoSans: ['Nunito sans', 'sans-serif']
      },
      gridTemplateColumns: {
        autoFit: 'repeat(auto-fit, minmax(14.6rem, 1fr))',
      },
      boxShadow: {
        m: '0 0.5px 7px 1px #dddddd'
      },
      animation: {
        'spin-slow': 'spin 40s linear infinite',
        'spinnerOne': 'spinner 1.875s infinite backwards',
      },
      keyframes: {
        spinner: {
          '0%': {transform: 'rotate(0deg) translateY(-200%)'},
          '60%, 100%': {transform: 'rotate(360deg) translateY(-200%)'},
        },
      }
    },
  },
  plugins: [],
}

