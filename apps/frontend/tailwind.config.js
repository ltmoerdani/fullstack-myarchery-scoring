/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
        // Custom theme colors
        'header-bg': "hsl(var(--header-bg))",
        'header-border': "hsl(var(--header-border))",
        'sidebar-bg': "hsl(var(--sidebar-bg))",
        'content-bg': "hsl(var(--content-bg))",
        'glass-bg': "hsl(var(--glass-bg))",
        'shadow-color': "hsl(var(--shadow-color))",
        'hover-bg': "hsl(var(--hover-bg))",
        'active-bg': "hsl(var(--active-bg))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
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
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "theme-transition": {
          from: { opacity: "0.8" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "theme-transition": "theme-transition 0.3s ease-in-out",
      },
      boxShadow: {
        'theme': '0 4px 6px -1px hsl(var(--shadow-color)), 0 2px 4px -1px hsl(var(--shadow-color))',
        'theme-lg': '0 10px 15px -3px hsl(var(--shadow-color)), 0 4px 6px -2px hsl(var(--shadow-color))',
        'theme-xl': '0 20px 25px -5px hsl(var(--shadow-color)), 0 10px 10px -5px hsl(var(--shadow-color))',
      },
      backdropBlur: {
        'theme': '8px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom plugin for theme utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.theme-transition': {
          'transition-property': 'background-color, border-color, color, fill, stroke, box-shadow',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '300ms',
        },
        '.theme-transition-fast': {
          'transition-property': 'background-color, border-color, color, fill, stroke, box-shadow',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '200ms',
        },
        '.theme-transition-slow': {
          'transition-property': 'background-color, border-color, color, fill, stroke, box-shadow',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '500ms',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};