/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch",
          },
        },
      },
      colors: {
        'text': '#EBE9FC',
        'background': {
          '50': '#f2f2fd',
          '100': '#e4e4fa',
          '200': '#c2c4f5',
          '300': '#8d94ec',
          '400': '#505ee0',
          '500': '#2a39cd',
          '600': '#1b24ae',
          '700': '#171c8d',
          '800': '#171c75',
          '900': '#181b62',
          '950': '#010104',
        },
        'primary': {
          '50': '#ecf1ff',
          '100': '#dde6ff',
          '200': '#c2d0ff',
          '300': '#9db1ff',
          '400': '#7686ff',
          '500': '#565efe',
          '600': '#3f38f3',
          '700': '#3a31d8',
          '800': '#2b26ad',
          '900': '#282788',
          '950': '#19174f',
        },
        'secondary': {
          '50': '#e4edff',
          '100': '#cfddff',
          '200': '#a8c0ff',
          '300': '#7495ff',
          '400': '#3e56ff',
          '500': '#131bff',
          '600': '#0002ff',
          '700': '#0002ff',
          '800': '#0002e4',
          '900': '#0500b0',
          '950': '#020024',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

