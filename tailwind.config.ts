import type { Config } from "tailwindcss"

const config = {
	darkMode: ["class"],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{js,ts,jsx,tsx}',
	],

	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		scrollBehavior: ['responsive'],
		extend: {
			fontFamily: {
				geist: 'var(--font-geist-sans)',
				mono: 'var(--font-geist-mono)',
			},
			backgroundImage: {
				'primary': 'linear-gradient(to right, #007bbf 0%, #007bbf 100%)',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// primary: {
				// 	DEFAULT: 'hsl(var(--primary))',
				// 	foreground: 'hsl(var(--primary-foreground))'
				// },
				// secondary: {
				// 	DEFAULT: 'hsl(var(--secondary))',
				// 	foreground: 'hsl(var(--secondary-foreground))'
				// },
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
				// popover: {
				// 	DEFAULT: 'hsl(var(--popover))',
				// 	foreground: 'hsl(var(--popover-foreground))'
				// },
				// card: {
				// 	DEFAULT: 'hsl(var(--card))',
				// 	foreground: 'hsl(var(--card-foreground))'
				// },
				current: "currentColor",
				primary: "#007bbf",
				bordercolor: "#d4d0d0ff",
				secondary: '#e91c24',
				meta: "#20C5A8",
				socialicon: "#D1D8E0",
				// gradientStart: '#ff0000', // Start color of gradient
				// gradientEnd: '#ff0000', // End color of gradient
			},
			fontSize: {
				metatitle: ["12px", "20px"],
				sectiontitle: ["14px", "22px"],
				regular: ["16px", "26px"],
				metatitle3: ["18px", "26px"],
				metatitle2: ["20px", "32px"],
				para2: ["22px", "35px"],
				itemtitle: ["26px", "32px"],
				itemtitle2: ["24px", "32px"],
				hero: ["44px", "58px"],
				sectiontitle3: ["44px", "55px"],
				sectiontitle2: ["40px", "52px"],
				sectiontitle4: ["34px", "48px"],
			},
			spacing: {
				4.5: "1.125rem",
				5.5: "1.375rem",
				6.5: "1.625rem",
				7.5: "1.875rem",
				8.5: "2.125rem",
				10.5: "2.625rem",
				11.5: "2.875rem",
				12.5: "3.125rem",
				13: "3.25rem",
				13.5: "3.375rem",
				14.5: "3.625rem",
				15: "3.75rem",
				15.5: "3.875rem",
				16: "4rem",
				17: "4.25rem",
				17.5: "4.375rem",
				18: "4.5rem",
				18.5: "4.625rem",
				19: "4.75rem",
				21: "5.25rem",
				21.5: "5.375rem",
				22: "5.5rem",
				22.5: "5.625rem",
				25: "6.25rem",
				27: "6.75rem",
				27.5: "6.875rem",
				29: "7.25rem",
				29.5: "7.375rem",
				30: "7.5rem",
				32.5: "8.125rem",
				35: "8.75rem",
				37.5: "9.375rem",
				40: "10rem",
				42.5: "10.625rem",
				45: "11.25rem",
				46: "11.5rem",
				47.5: "11.875rem",
				50: "12.5rem",
				55: "13.75rem",
				60: "15rem",
				65: "16.25rem",
				67: "16.75rem",
				67.5: "16.875rem",
				90: "22.5rem",
			},
			maxWidth: {
				"c-1390": "86.875rem",
				"c-1315": "82.188rem",
				"c-1280": "80rem",
				"c-1235": "77.188rem",
				"c-1154": "72.125rem",
				"c-1016": "63.5rem",
			},
			zIndex: {
				99999: "99999",
				999: "999",
				1: "1",
			},
			opacity: {
				65: ".65",
			},
			transitionProperty: { width: "width" },
			boxShadow: {
				"solid-l": "0px 10px 120px 0px rgba(45, 74, 170, 0.1)",
				"solid-2": "0px 2px 10px rgba(122, 135, 167, 0.05)",
				"solid-3": "0px 6px 90px rgba(8, 14, 40, 0.04)",
				"solid-4": "0px 6px 90px rgba(8, 14, 40, 0.1)",
				"solid-5": "0px 8px 24px rgba(45, 74, 170, 0.08)",
				"solid-6": "0px 8px 24px rgba(10, 16, 35, 0.08)",
				"solid-7": "0px 30px 50px rgba(45, 74, 170, 0.1)",
				"solid-8": "0px 12px 120px rgba(45, 74, 170, 0.06)",
				"solid-9": "0px 12px 30px rgba(45, 74, 170, 0.06)",
				"solid-10": "0px 8px 30px rgba(45, 74, 170, 0.06)",
				"solid-11": "0px 6px 20px rgba(45, 74, 170, 0.05)",
				"solid-12": "0px 2px 10px rgba(0, 0, 0, 0.05)",
				"solid-13": "0px 2px 19px rgba(0, 0, 0, 0.05)",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {

				move: {
					"0%": { transform: "translateX(-200px)" },
					"100%": { transform: "translateX(200px)" },
				},
				line: {
					"0%, 100%": { transform: "translateY(100%)" },
					"50%": { transform: "translateY(0)" },
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'background-position-spin': {
					'0%': {
						backgroundPosition: 'top center'
					},
					'100%': {
						backgroundPosition: 'bottom center'
					}
				},
				wave: {
					'0%, 100%': { transform: 'translateX(0)' },
					'50%': { transform: 'translateX(-10px)' },
				},
				shimmer: {
					from: {
						"backgroundPosition": "0 0"
					},
					to: {
						"backgroundPosition": "-200% 0"
					}
				},
				meteor: {
					"0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
					"70%": { opacity: "1" },
					"100%": {
						transform: "rotate(215deg) translateX(-500px)",
						opacity: "0",
					},
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(-4px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slide: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				// ripple: {
				//   '0%, 100%': {
				//     transform: 'translate(-50%, -50%) scale(1)',
				//   },
				//   '50%': {
				//     transform: 'translate(-50%, -50%) scale(0.9)',
				//   },
				// },
			},
			animation: {
				'fade-in': 'fade-in 0.6s ease-out',
				//ripple: 'ripple 2s ease-in-out infinite',
				line1: "line 3s linear infinite",
				line2: "line 6s linear infinite",
				line3: "line 9s linear infinite",
				move: "move 5s linear infinite",
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				shimmer: "shimmer 2s linear infinite",
				slide: 'slide 30s linear infinite',
				"meteor-effect": "meteor 5s linear infinite",
				'background-position-spin': 'background-position-spin 3000ms infinite alternate'
			}
		}

	},

	plugins: [require("tailwindcss-animate")],

} satisfies Config

export default config