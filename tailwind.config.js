module.exports = {
  content: [
    "./public/**/*.html",
    "./public/**/*.js",
    "./public/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#509EE3',
          dark: '#236CB9'
        },
        secondary: '#6D5DCF',
        success: '#4CAF50',
        error: '#F44336',
        text: {
          DEFAULT: '#333333',
          light: '#666666'
        },
        border: '#CCCCCC',
        'bg-light': '#F5F7FA'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [],
}