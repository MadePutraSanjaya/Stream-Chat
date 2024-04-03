import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "15px",
      }
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
    colors: {
      primary: "#E9EDEF",
      secondary: "#8696A0"
    },
    backgroundColor: {
      primary: "#111B21",
      secondary: "#202C33"
    },
    backgroundImage:{
      waBg: "url(/wa-bg.jpeg)"
    },
    fontFamily: {
      poppins: [`var(--font-poppins)`, "sans-serif"],
    },
    },
  },
  plugins: [],
};
export default config;
