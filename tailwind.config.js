module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        coolGray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
        },
      },
      keyframes: {
        transcend: {
          "-50%": {
            opacity: "0",
          },
          0: {
            opacity: "1",
          },
        },
      },
      animation: {
        transcend: "transcend 1s ease-in-out 0.8s",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
