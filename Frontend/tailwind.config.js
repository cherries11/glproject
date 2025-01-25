/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Includes all React files
  ],
  animation: {
    'wiggle': 'wiggle 1s ease-in-out infinite',
  },
  keyframes: {
    wiggle: {
      '0%, 100%': { transform: 'rotate(-3deg)' },
      '50%': { transform: 'rotate(3deg)' },
    },
  },
  theme: {
    extend: { colors: {

   hover:'#CEAFB4',
      new:'#B66E7A',
      footer:'#C2C2C2',
      border:'#e0e0e0',
      text:'#4e4e4e'
      
    },
    fontFamily: {
      caladea: ['"Caladea"', 'serif'], // Add Caladea
    },
  },
  },
  plugins: [],
};
