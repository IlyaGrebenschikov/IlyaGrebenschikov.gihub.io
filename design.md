# STALKER MMO Game UI/UX Design Guide

## Design Philosophy

### Visual Language
- **Post-apocalyptic industrial aesthetic** with Eastern European brutalist influences
- **Atmospheric tension** through desaturated colors and moody lighting
- **Functional design** prioritizing usability in harsh survival conditions
- **Immersive interface** that feels like actual equipment used by stalkers

### Color Palette
- **Primary**: Deep slate gray (#1a1a1a) and weathered metal (#2d3748)
- **Accent**: Radioactive green (#10b981) for active elements and indicators
- **Warning**: Amber/orange (#f59e0b) for danger zones and critical information
- **Text**: Off-white (#e5e7eb) for primary text, muted gray (#9ca3af) for secondary

### Typography
- **Display Font**: "Orbitron" - futuristic, technical aesthetic for headings
- **Body Font**: "JetBrains Mono" - monospace for data displays and terminal-style text
- **Accent Font**: "Cyrillic" styled fonts for authentic Eastern European feel

## Visual Effects & Styling

### Used Libraries & Effects
- **Anime.js**: Smooth transitions and UI element animations
- **Pixi.js**: Particle effects for radiation, dust, and atmospheric elements
- **Shader-park**: Custom shaders for CRT monitor effects and screen distortion
- **p5.js**: Dynamic background effects and interactive elements
- **ECharts.js**: Data visualization for player stats and zone information
- **Splide.js**: Smooth carousel transitions for inventory and equipment screens

### Animation & Interaction
- **Glitch effects** on UI state changes
- **Scanline overlays** for authentic monitor feel
- **Particle systems** for environmental atmosphere
- **Smooth fade transitions** between UI states
- **Hover effects** with subtle glow and scale transforms

### Header & Background Effects
- **Animated noise texture** for screen static
- **Dynamic lighting** that responds to in-game time
- **Depth parallax** layers for immersion
- **Geiger counter audio** integration for ambient tension

## UI Frame Architecture

### Core Screens
1. **Main Menu** - Game launch and settings access
2. **Game HUD** - In-game interface with health, ammo, minimap
3. **Inventory Management** - Equipment, items, and crafting
4. **Map & Navigation** - Zone exploration and waypoint system
5. **Character Progression** - Skills, perks, and player development
6. **Social Hub** - Squad management and player interactions
7. **Settings & Options** - Game configuration and controls

### Interactive Elements
- **Geiger Counter**: Real-time radiation level indicator
- **Health Monitor**: Vital signs with medical warnings
- **Ammo Counter**: Current weapon statistics
- **Mini-map**: Dynamic zone representation with anomalies
- **Quick Slots**: Rapid access to essential items
- **Communication Panel**: Radio chatter and squad communications

### Navigation Flow
- **Seamless transitions** between game and menu states
- **Quick access** to critical functions during gameplay
- **Contextual UI** that adapts to player situation
- **Keyboard shortcuts** for experienced players
- **Controller support** for console-style interaction