/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Ensure this path is included
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#FF6800",
          80: "#f76f12",
          60: "#ffa20d",
          40: "#f7c46c",
          20: "#f2e2c1",
        },
        green: {
          50: "#30AF5B",
          90: "#292C27",
        },
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#141414",
        },
        orange: {
          50: "#FF814C",
        },
        blue: {
          70: "#021639",
        },
        yellow: {
          50: "#FEC601",
        },
      },
      backgroundImage: {
        "bg-img-1": "url('/img-1.png')",
        "bg-img-2": "url('/img-2.png')",
        "feature-bg": "url('/feature-bg.png')",
        pattern: "url('/pattern.png')",
        "pattern-2": "url('/pattern-bg.png')",
        "pattern-3": "url('/home/pattern.png')",
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      maxWidth: {
        "10xl": "1512px",
      },
      borderRadius: {
        "5xl": "40px",
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
      addVariant,
      e,
    }: {
      addUtilities: any;
      addVariant: any;
      e: any;
    }) {
      // Add custom utilities for the :before pseudo-class
      addUtilities({
        ".before-overlay": {
          position: "relative",
          zIndex: 1, // Ensure children have a higher z-index
        },
        ".before-overlay::before": {
          content: '""',
          backgroundColor: "#FF6800",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, // Ensure the pseudo-element is behind the children
          opacity: 0.9, // Adjust the opacity as needed
        },
      });

      // Add custom variants for pseudo-classes
      addVariant(
        "before",
        ({
          modifySelectors,
          separator,
        }: {
          modifySelectors: any;
          separator: any;
        }) => {
          modifySelectors(({ className }: { className: any }) => {
            return `.${e(`before${separator}${className}`)}::before`;
          });
        }
      );
    },
  ],
};
