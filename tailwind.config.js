
// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideRight: {
          '0%': {
            transform: 'translateX(-200px)',
            opacity: 0
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1
          }
        },
        slideLeft: {
          '0%': {
            transform: 'translateX(200px)',
            opacity: 0
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1
          }
        },
        slideTop: {
          '0%': {
            transform: 'translateY(-100px)',
            opacity: 0
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1
          }
        },
        slideBottom: {
          '0%': {
            transform: 'translateY(200px)',
            opacity: 0
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1
          }
        },
        zoomIn: {
          '0%': {
            scale: 0,
            opacity: 0
          },
          '100%': {
            scale: 1,
            opacity: 1
          }
        },
        // 浮动
        float: {
          '0%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-5%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        }
      },
      animation: {
        slideRight: 'slideRight 1s ease-in-out ',
        slideLeft: 'slideLeft 1s ease-in-out ',
        slideTop: 'slideTop 0.5s ease-in-out ',
        slideBottom: 'slideBottom 1s ease-in-out ',
        zoomIn: 'zoomIn 1s ease forwards',
        zoomInAndFloat: 'zoomIn 1s ease forwards, float 3s ease-in-out infinite',
      }
      // aspectRatio:{
      //   aspectRatio
      // }
    },
  },
  plugins: [nextui()],
}

