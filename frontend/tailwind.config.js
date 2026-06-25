/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        ink: {
          50:  '#fafaf9',
          100: '#f5f4f1',
          200: '#e9e6e0',
          300: '#cfcac1',
          400: '#9a948a',
          500: '#6b665e',
          600: '#4a4641',
          700: '#2f2c28',
          800: '#1c1a18',
          900: '#100f0e',
        },
        coral: {
          50:  '#fdf3f0',
          100: '#fbe2db',
          200: '#f5bfb0',
          300: '#ec9a83',
          400: '#e07a5f',
          500: '#d35d44',
          600: '#b94a35',
          700: '#943a2b',
          800: '#6e2c22',
          900: '#4b1f19',
        },
      },
      boxShadow: {
        soft: '0 8px 30px rgba(20,16,14,0.06)',
        elevated: '0 20px 60px -20px rgba(20,16,14,0.18)',
      },
      backgroundImage: {
        'warm-radial': 'radial-gradient(1200px 600px at 80% -10%, rgba(224,122,95,0.18), transparent 60%), radial-gradient(900px 500px at -10% 30%, rgba(211,93,68,0.10), transparent 60%)',
        'coral-gradient': 'linear-gradient(135deg, #e07a5f 0%, #d35d44 50%, #943a2b 100%)',
      },
    },
  },
  plugins: [],
};
