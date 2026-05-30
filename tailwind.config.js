/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#0E0A0B',
        crimson: '#4A0404',
        red: '#8B1A1A',
        vermilion: '#D94436',
        white: '#F2E8E8',
        cream: '#FAEBDC',
        peach: '#F4C5B0',
        salmon: '#E89F88',
        muted: '#8A6E6E',
        brown: '#3A1A10',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        cursive: ['"Dancing Script"', 'cursive'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "charReveal": {
          from: { transform: "translateX(-120%)" },
          to: { transform: "translateX(0)" },
        },
        "roseFloat": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg) scale(1)" },
          "25%": { transform: "translateY(-8px) rotate(3deg) scale(1.02)" },
          "50%": { transform: "translateY(-4px) rotate(-2deg) scale(0.98)" },
          "75%": { transform: "translateY(-10px) rotate(4deg) scale(1.01)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "charReveal": "charReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "roseFloat": "roseFloat 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
