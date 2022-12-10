module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
   theme: {
      extend: {
         fontFamily: {
            poppins: ["Poppins", "sans-serif"],
            montserrat: ["Montserrat", "sans-serif"],
            oswald: ["Oswald", "sans-serif"],
            merriweather: [" Merriweather", "serif"],
         },
         colors: {
            "container-color": "#ececf4",
            "main-accent": "#101110 ",
            "secondary-accent": "#1d1f1d",
            "dark-main-accent": "#e9ebf1 ",
            "dark-secondary-accent": "#bfc8d4",
            greenish: "#47bc83",
            blueish: "#42a5f5",

            "container-color-dark": "#23272e",
         },
      },
   },
   plugins: [require("flowbite/plugin")],
};

// Montserrat and Oswald. ...
// Merriweather with Oswald. ...
// Montserrat with Merriweather. ...
