---
name: Botanical Minimalism
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#414844'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#717974'
  outline-variant: '#c1c8c3'
  surface-tint: '#446557'
  primary: '#143529'
  on-primary: '#ffffff'
  primary-container: '#2b4c3f'
  on-primary-container: '#98bbab'
  inverse-primary: '#aacfbd'
  secondary: '#006e0c'
  on-secondary: '#ffffff'
  secondary-container: '#8efb7f'
  on-secondary-container: '#00750d'
  tertiary: '#67000a'
  on-tertiary: '#ffffff'
  tertiary-container: '#89181c'
  on-tertiary-container: '#ff9790'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c6ebd9'
  primary-fixed-dim: '#aacfbd'
  on-primary-fixed: '#002116'
  on-primary-fixed-variant: '#2c4d40'
  secondary-fixed: '#8efb7f'
  secondary-fixed-dim: '#73de66'
  on-secondary-fixed: '#002201'
  on-secondary-fixed-variant: '#005307'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ae'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#8b191d'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  overdue-red: '#D9534F'
  today-green: '#4BB543'
  upcoming-gray: '#6C757D'
  deep-sage: '#2B4C3F'
  soft-white: '#F8F9FA'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max-width: 448px
  edge-margin: 1.25rem
  gutter: 1rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 1.5rem
---

## Brand & Style
The design system embodies a **Botanical Minimalism** aesthetic, specifically tailored for a mobile-first plant care experience. The brand personality is nurturing, serene, and organized—acting as a calm digital sanctuary for plant enthusiasts. 

The visual style blends **Minimalism** with **Organic Tactility**. By utilizing generous whitespace and a "Soft White" canvas, the interface reduces cognitive load for users managing multiple care schedules. The UI leverages high-quality plant photography and soft, rounded containers to evoke a cozy, domestic feel. Interaction patterns are designed to feel intentional and gentle, moving away from aggressive "productivity" tropes toward a more rhythmic, natural lifecycle management.

**Core Principles:**
- **Clarity over Density:** Information is spaced to breathe, reflecting the growth environment of plants.
- **Nurturing Feedback:** Success states feel rewarding (Fresh Green), while alerts (Muted Red) are informative and helpful rather than stressful.
- **Mobile-First Ergonomics:** Large touch targets and a bottom-heavy interaction model (FABs and navigation) ensure ease of use during physical plant care tasks.

## Colors
The palette is rooted in a natural, earthy spectrum that balances professional utility with organic warmth.

- **Primary (Deep Sage):** Used for typography, iconography, and primary brand elements. It provides high contrast against the light background while maintaining a sophisticated, botanical feel.
- **Success/Today (Fresh Green):** Reserved for positive actions like "Watering Complete" and the "Today" status badge. It signifies life and health.
- **Error/Overdue (Muted Red):** A softened red that draws attention to plants needing urgent care without creating a sense of panic.
- **Muted/Upcoming (Warm Gray):** Used for secondary text, metadata labels, and the "Upcoming" status to indicate a neutral, pending state.
- **Background (Soft White):** A near-white with a slight warmth that prevents screen glare and mimics natural paper or clean ceramic textures.

## Typography
**Plus Jakarta Sans** is the sole typeface for this design system. Its modern, slightly rounded geometric forms mirror the "Rounded-2xl" shape language of the UI components, creating a cohesive and friendly atmosphere.

- **Headlines:** Use Bold or Semi-Bold weights with slight negative letter-spacing for a clean, editorial look.
- **Body Text:** Standardized at 16px for readability during active care (when the user might be holding a watering can).
- **Labels:** Used for metadata like "Next Watering" or "Light Conditions," utilizing medium weights to maintain hierarchy without overwhelming the primary content.
- **Hierarchy:** Ensure the dynamic plant nickname in the header uses `headline-md` to maintain clear context during navigation.

## Layout & Spacing
This system follows a **Mobile-First Fixed Grid** philosophy. To ensure a premium, focused experience on larger devices, the layout is constrained to a maximum width of `448px` (max-w-md), centered on the screen.

- **Margins:** A consistent 20px (1.25rem) side margin is applied to all main views.
- **Vertical Rhythm:** Components are stacked using a base-8 scale. Card elements are separated by 16px (1rem), while grouping labels and their subsequent content use 8px (0.5rem).
- **Dynamic Padding:** Cards and Modals use 16px internal padding to ensure content does not feel cramped against the highly rounded corners.
- **Breakpoints:**
  - **Mobile (< 448px):** Full width with edge margins.
  - **Tablet/Desktop (> 448px):** Centered "Device" view with a soft shadow background to simulate a mobile app interface within a browser.

## Elevation & Depth
Elevation is conveyed through **Tonal Layers** and **Soft Ambient Shadows** rather than stark borders.

- **Surface Levels:** 
  - Level 0 (Soft White): The main application background.
  - Level 1 (Pure White): Surface for PlantCards and Input fields. This creates a subtle lift against the Soft White background.
- **Shadows:** Use extremely diffused, low-opacity shadows (Blur: 20px, Spread: -4px, Opacity: 4%) tinted with the Deep Sage color (#2B4C3F). This makes elements appear like they are gently resting on the surface.
- **Glassmorphism:** Reserved exclusively for the Bottom Floating Action Button (FAB) and Global Toasts. Use a high backdrop-blur (12px) and 90% opacity white background to ensure these elements remain legible over scrolling content without feeling heavy.

## Shapes
The shape language is defined by the **Rounded (2xl)** approach, which is critical to the "Botanical" theme. 

- **Interactive Elements:** Buttons, Input fields, and PlantCards must use a corner radius of `1rem` (16px) or larger.
- **Large Containers:** Modals and bottom sheets should utilize `1.5rem` (24px) for the top corners to emphasize the friendly, non-industrial nature of the app.
- **Status Badges:** Use fully pill-shaped (rounded-full) corners to distinguish them from clickable card elements.
- **Visual Metaphor:** The high roundedness mimics the organic curves of leaves and pebbles, reinforcing the plant-care narrative.

## Components

### Buttons
- **Primary:** Deep Sage background with White text. Rounded-2xl.
- **Secondary (Watering):** Fresh Green background. Used for the core "Complete" action.
- **Ghost/Tertiary:** No background, Deep Sage text. Used for "Cancel" or "Back" actions.

### Plant Cards
- **Structure:** Level 1 White surface, soft shadow. Top section features a rounded-xl image. Bottom section contains the Nickname (Headline-md) and the StatusBadge.
- **States:** Highlighted with a 2px Fresh Green border only when selected in the Preset Carousel.

### Status Badges
- **Overdue:** Muted Red background (10% opacity) with Muted Red text.
- **Today:** Fresh Green background (10% opacity) with Fresh Green text.
- **Upcoming:** Warm Gray background (10% opacity) with Warm Gray text.

### Input Fields
- **Styling:** Soft White background (Level 0) with a subtle 1px border in Warm Gray. On focus, the border transitions to Deep Sage. Corner radius: 1rem.

### Global Toast (Snackbar)
- **Interaction:** Slides up from the bottom. Includes an "Undo" action in a high-contrast color (White or Fresh Green). Uses a glassmorphic background to maintain depth.

### Floating Action Button (FAB)
- **Styling:** Circular (Pill-shaped), Deep Sage background, White icon. Positioned at the bottom right with a 20px offset from the edges.