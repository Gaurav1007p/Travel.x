/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-dark': '#0A0F1D',
        'luxury-darker': '#06070F',
        'neon-coral': '#FF6B6B',
        'neon-teal': '#00F2FE',
        'neon-indigo': '#B366FF',
        'neon-peach': '#FFB86C',
      },
      backgroundImage: {
        'gradient-orbs': 'radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(179, 102, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(0, 242, 254, 0.08) 0%, transparent 50%)',
        'gradient-neon': 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(0, 242, 254, 0.1))',
      },
      boxShadow: {
        'neon-coral': '0 0 20px rgba(255, 107, 107, 0.3)',
        'neon-teal': '0 0 20px rgba(0, 242, 254, 0.3)',
        'neon-glow': '0 0 30px rgba(0, 242, 254, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in-blur': 'fade-in-blur 0.8s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-blur': {
          'from': { opacity: '0', filter: 'blur(10px)' },
          'to': { opacity: '1', filter: 'blur(0)' },
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'mono': ['Courier Prime', 'Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}