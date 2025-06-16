module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'), // This line causes the error because 'autoprefixer' is not installed
  ],
};