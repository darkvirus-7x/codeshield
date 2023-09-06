/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 0 7px 0 rgba(0,0,0,.6)',
        'custom2': '0 0 17px 0 rgba(255,255,255,.2)'
      },
      letterSpacing: {
        '3xl': '-15',
        'base': '-8'
      },
      colors: {
        'gradient1': '#561b67',
        'gradient2': '#222faa',
        'gradient3': '#123262',
        'gradient4': '#161233',
        'gradient5': 'rgba(0,0,0,.2)',
        'color6': 'rgb(226 ,232 ,240 , .05)',
        'gradient6': 'rgba(124 121 121 / 23%)'
      },
      backgroundImage: {
        'fpattern': "url('./public/wave-haikei.svg')"
      },
      width: {
        'custom1': '179px'
      },
      borderRadius: {
        'custom1': '23px',
        'custom2': '5px'
      },
      fontSize:{
        'custom1': '14px'
      },
      keyframes:{
        terminal: {
          'to': {opacity: '100'}
        },
        menu: {
          'to': {right: '0'}
        },
        onmenu: {
          'to': {right: '-320px'}
        }
      },
      animation: {
        terminal: 'terminal 1s ease-in forwards',
        menu: 'menu 2s linear forwards',
        onmenu: 'onmenu 2s linear forwards',
      },
      screens:{
        'custom1': '1100px',
        'custom2': '690px',
        'custom3': '315px',
        'custom4': '881px',
        'custom5': '415px',
      }
    },
  },
  plugins: [],
}

// width: 179px;
// background: linear-gradient(180deg, #123262, #161233);
// bottom: -21px;
// border-top-right-radius: 23px;
//