# Color Customization Guide

All colors are now defined as CSS variables in `src/index.css`, making it easy to experiment with different color schemes that work with your logo.

## Primary Color Variables

The main brand color and all its variations are defined in the `:root` section of `src/index.css`:

```css
--color-primary: #C41E3A;  /* Main brand color */
--color-primary-light: #E63950;
--color-primary-dark: #9B1528;
```

## RGB Values for Gradients

To change the gradient colors throughout the site, update the RGB values:

```css
--color-primary-rgb: 196, 30, 58;  /* Change these 3 numbers to match your new color */
```

This automatically updates all gradient variations:
- `--color-primary-01` through `--color-primary-25` (different opacity levels)
- All background patterns
- All gradient effects

## How to Change Colors

### Step 1: Choose Your New Color
Pick a color that complements your logo. For example:
- Blue: `--color-primary: #2563EB;` and `--color-primary-rgb: 37, 99, 235;`
- Teal: `--color-primary: #14B8A6;` and `--color-primary-rgb: 20, 184, 166;`
- Purple: `--color-primary: #7C3AED;` and `--color-primary-rgb: 124, 58, 237;`

### Step 2: Update Variables in `src/index.css`

Find the `:root` section and update:
1. `--color-primary` - Main color (hex format)
2. `--color-primary-light` - Lighter version (for hover states)
3. `--color-primary-dark` - Darker version (for depth)
4. `--color-primary-rgb` - RGB values (comma-separated, no parentheses)

### Step 3: Calculate RGB Values

If you have a hex color, convert it to RGB:
- Use an online converter, or
- In JavaScript: `parseInt('#2563EB'.slice(1,3), 16)` for R, etc.

## Where Colors Are Used

All these areas will automatically update when you change the variables:

1. **Background Patterns** (`index.css` body)
   - Big squares pattern
   - Dot pattern
   - Grid pattern
   - Diagonal lines
   - Accent glows

2. **Hero Section** (`Hero.css`)
   - Company name badge background
   - Company name badge border
   - Hero visual glow effect

3. **Section Titles** (`Section.css`)
   - Left border accent

4. **File Creation Animation** (`FileCreationAnimation.css`)
   - Icon colors
   - Processing glow
   - Drop shadows

5. **Brick Animation** (`BrickAnimation.css`)
   - Panel borders
   - Glow effects
   - Hover states

6. **Input Fields** (`Input.css`)
   - Error state borders and shadows

7. **Footer** (`Footer.css`)
   - Social link hover backgrounds

## Example: Changing to Blue

```css
:root {
    --color-primary: #2563EB;
    --color-primary-light: #3B82F6;
    --color-primary-dark: #1E40AF;
    --color-primary-rgb: 37, 99, 235;
}
```

That's it! All gradients and effects will automatically use the new color.

## Testing Different Colors

1. Open `src/index.css`
2. Find the `:root` section (around line 1-60)
3. Update the color variables
4. Save and refresh your browser
5. All gradients and effects will update automatically

No need to search through individual component files - everything is centralized!
