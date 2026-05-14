/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				background: '#050510',
				foreground: '#ffffff',
				border: 'rgba(255, 255, 255, 0.06)',
				input: 'rgba(255, 255, 255, 0.05)',
				ring: '#00D9FF',
				primary: {
					DEFAULT: '#00D9FF',
					foreground: '#050510',
				},
				secondary: {
					DEFAULT: '#7C3AED',
					foreground: '#ffffff',
				},
				accent: {
					DEFAULT: '#06B6D4',
					foreground: '#ffffff',
				},
				muted: {
					DEFAULT: 'rgba(255, 255, 255, 0.05)',
					foreground: '#94A3B8',
				},
				card: {
					DEFAULT: 'rgba(255, 255, 255, 0.02)',
					foreground: '#ffffff',
				},
			},
			borderRadius: {
				lg: '16px',
				md: '12px',
				sm: '8px',
			},
			boxShadow: {
				'glow-cyan': '0 0 30px rgba(0, 217, 255, 0.2)',
				'glow-purple': '0 0 30px rgba(124, 58, 237, 0.2)',
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
			},
			keyframes: {
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
