# Design Guidelines: Italian Sorting Game (Gioco di Ordinamento)

## Design Approach
**System-Based Approach** - Educational utility application prioritizing clarity, usability, and visual feedback. Drawing inspiration from modern educational platforms (Kahoot, Quizlet, Duolingo) with clean interfaces that balance engagement with focus.

## Core Design Principles
1. **Clarity First** - Every element serves the learning objective
2. **Immediate Feedback** - Visual responses to all interactions
3. **Competitive but Friendly** - Leaderboard motivates without intimidation
4. **Distraction-Free** - Minimal animations, maximum focus

## Color Palette

### Light Mode
- **Primary**: 220 75% 50% (Educational blue - trust and focus)
- **Primary Hover**: 220 75% 45%
- **Success**: 142 71% 45% (Correct sorting feedback)
- **Warning**: 38 92% 50% (Active pivot selection)
- **Danger**: 0 84% 60% (Top 3 highlight)
- **Background**: 0 0% 98% (Soft white)
- **Surface**: 0 0% 100% (Pure white cards)
- **Text Primary**: 220 13% 18%
- **Text Secondary**: 220 9% 46%
- **Border**: 220 13% 91%

### Dark Mode
- **Primary**: 220 75% 55%
- **Primary Hover**: 220 75% 60%
- **Success**: 142 71% 50%
- **Warning**: 38 92% 55%
- **Danger**: 0 84% 65%
- **Background**: 220 13% 12%
- **Surface**: 220 13% 16%
- **Text Primary**: 0 0% 95%
- **Text Secondary**: 220 9% 65%
- **Border**: 220 13% 24%

## Typography
- **Primary Font**: 'Inter' from Google Fonts (clean, highly readable)
- **Display Font**: 'Poppins' from Google Fonts (friendly for headings)
- **Headings**: Poppins Bold - 2xl to 4xl
- **Body Text**: Inter Regular - base to lg
- **Stats/Numbers**: Inter Bold - xl to 3xl (for timer, operations)
- **Leaderboard**: Inter Medium - sm to base

## Layout System
- **Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16 (p-4, gap-6, m-8, py-12, space-y-16)
- **Container**: max-w-4xl for game area, max-w-6xl for leaderboard
- **Grid System**: Single column mobile, strategic multi-column for number arrays (grid-cols-4 to grid-cols-8)

## Component Library

### Welcome Screen
- Centered card (max-w-md) with generous padding (p-8)
- Large heading with Poppins Bold
- Input field with focus ring in primary color
- Full-width primary button with subtle shadow
- Error message below input in danger color

### Countdown Screen
- Full viewport centered content (min-h-screen flex items-center)
- Countdown numbers: 6xl Poppins Bold in primary color
- Pulsing scale animation (only during countdown)
- Text: "Pronto? Via!" above countdown

### Game Interface
**Stats Bar** (Top section):
- Horizontal flex layout with 3 stat cards
- Each stat: Icon + Label + Large number (3xl)
- Background: surface color with subtle border
- Sticky positioning (sticky top-0)

**Number Array** (Main section):
- Grid layout (grid-cols-5 md:grid-cols-8 lg:grid-cols-10)
- Each number: Square card, centered text (2xl font), cursor-pointer
- Hover state: lift with shadow and primary border
- Selected pivot: Warning background, bold border
- Sorted numbers: Success color background
- Transition: all 300ms ease for smooth rearrangement

**Action Feedback**:
- Comparison flash: Brief highlight animation
- Swap movement: Smooth position transitions
- Completion: Success message banner with checkmark

### Leaderboard
**Header**: 
- Title "Classifica" (Poppins Bold 3xl)
- Subtitle explaining ranking rules (Inter Regular sm, text-secondary)
- Auto-update indicator (subtle pulse every 3s)

**Table Layout**:
- Full-width table with alternating row backgrounds
- Columns: Rank | Name | Operations | Time
- Top 3 rows: danger color text, bold font weight, subtle background tint
- Rank badges for 1st, 2nd, 3rd (🥇🥈🥉 or styled numbers)
- Current user row: primary border highlight
- Padding: py-3 px-4 per cell

**Responsive**: Stack table on mobile into cards

## Interaction States
- **Hover**: Scale 1.02, shadow-md, primary border
- **Active**: Scale 0.98
- **Disabled**: Opacity 50%, cursor-not-allowed
- **Focus**: Ring-2 ring-primary ring-offset-2

## Game-Specific Design Elements

### Number Cards
- Size: w-16 h-16 (mobile) to w-20 h-20 (desktop)
- Border radius: rounded-lg
- Shadow: shadow-sm default, shadow-lg on hover
- Font: Inter Bold 2xl

### Pivot Selection Highlight
- Thick border (border-4) in warning color
- Glow effect (ring-4 ring-warning ring-opacity-50)
- Pulse animation while active

### Sorting Animation
- Transition duration: 400ms
- Easing: cubic-bezier for natural movement
- No distracting particle effects

### Completion State
- Success banner: Top of screen, success background
- Message: "Completato! Ottimo lavoro!" with checkmark icon
- Fade-in animation

## Accessibility
- Dark mode toggle (sun/moon icon in top right)
- High contrast ratios (WCAG AA minimum)
- Focus indicators on all interactive elements
- Screen reader labels in Italian
- Keyboard navigation support (Tab, Enter, Space)

## Visual Hierarchy
1. **Primary**: Current game state (numbers being sorted)
2. **Secondary**: Real-time stats (time, operations)
3. **Tertiary**: Instructions and leaderboard

## Icons
Use **Heroicons** via CDN:
- Clock icon for timer
- Calculator icon for operations  
- Trophy icon for leaderboard
- Check circle for completion
- User icon for name input

## Images
**No hero image needed** - This is a focused utility application. All visuals are functional (numbers, stats, leaderboard).