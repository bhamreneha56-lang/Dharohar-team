/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8fafc",
        foreground: "#0f172a",
        card: "#ffffff",
        primary: "#1e3a8a",
        "primary-foreground": "#ffffff",
        secondary: "#f1f5f9",
        "secondary-foreground": "#0f172a",
        muted: "#64748b"
      },
      animation: {
        'slow-zoom': 'zoom 10s ease-in-out infinite alternate',
        'slide-up': 'slideUp 1s ease-out forwards',
        'slide-up-delay': 'slideUp 1s ease-out 0.5s forwards',
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fadeIn 1.5s ease-out forwards',
      },
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
