import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'xl': '1100px',
				'2xl': '1400px'
			}
		},
		extend: {
			/* Modern, clean font stack */
			fontFamily: {
				sans: ['Inter', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', '-apple-system'],
				heading: ['Inter', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui']
			},
			/* Colors with semantic naming */
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			/* Typography scale for modern, clean hierarchy */
			fontSize: {
				xs: ['12px', { lineHeight: '1.4', letterSpacing: '0.05em' }],
				sm: ['13px', { lineHeight: '1.5' }],
				base: ['16px', { lineHeight: '1.6' }],
				lg: ['18px', { lineHeight: '1.6' }],
				xl: ['20px', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
				'2xl': ['24px', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
				'3xl': ['28px', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
				'4xl': ['32px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
				'5xl': ['40px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
				'6xl': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
				'7xl': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'8xl': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em' }]
			},
			/* Generous spacing for airy layouts */
			spacing: {
				...Object.fromEntries(
					[...Array(64)].map((_, i) => [i, `${i * 0.25}rem`])
				),
				'section-xs': '3rem',
				'section-sm': '4rem',
				'section-md': '6rem',
				'section-lg': '8rem',
				'section-xl': '10rem'
			},
			/* Enhanced padding utilities for sections */
			padding: {
				'section': 'clamp(2rem, 5vw, 4rem)'
			},
			/* Clean border radius */
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			/* Subtle, refined animations */
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in-up': {
					from: {
						opacity: '0',
						transform: 'translateY(12px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in-down': {
					from: {
						opacity: '0',
						transform: 'translateY(-12px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'slide-in-right': {
					from: {
						opacity: '0',
						transform: 'translateX(16px)'
					},
					to: {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'slide-in-left': {
					from: {
						opacity: '0',
						transform: 'translateX(-16px)'
					},
					to: {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'scale-in': {
					from: {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					to: {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'pulse-glow-subtle': {
					'0%, 100%': {
						boxShadow: '0 0 8px rgba(58, 123, 255, 0.2)'
					},
					'50%': {
						boxShadow: '0 0 16px rgba(58, 123, 255, 0.35)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-6px)' }
				},
				'hover-lift': {
					from: { transform: 'translateY(0)' },
					to: { transform: 'translateY(-2px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
				'fade-in-down': 'fade-in-down 0.5s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'pulse-glow': 'pulse-glow-subtle 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'hover-lift': 'hover-lift 0.3s ease-out'
			},
			/* Transition utilities for smooth interactions */
			transitionDuration: {
				'200': '200ms',
				'300': '300ms'
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
