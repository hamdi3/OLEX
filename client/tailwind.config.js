module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Poppins',
    },
    container: {
      padding: {
        DEFAULT: '30px',
        lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: '#222222',
        secondary: '#F5E6E0',
        588157: '#588157',
      },
      backgroundImage: {
        hero: "url('./img/bghero.jpg')",
      },
      backgroundColor: {
        588157: '#588157',
        a3b18a: '#a3b18a',
      },
      textColor: {
        '3a5a40': '#3a5a40',
        a3b18a: '#a3b18a',
      },
    },
  },
  plugins: [],
};
