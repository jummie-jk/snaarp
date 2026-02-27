# Snaarp Assessment Dashboard

A responsive React dashboard with draggable sections, charts, and a collapsible sidebar for mobile and tablet.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** – build and dev server
- **Tailwind CSS** – styling
- **@dnd-kit** – drag and drop (core, sortable, utilities)
- **Recharts** – charts
- **Lucide React** – icons

## Prerequisites

- **Node.js** 18+ (or 20+ recommended)
- npm (or yarn / pnpm)

## How to run

1. **Clone and install**
   ```bash
   cd snarp-dashboard
   npm install
   ```

2. **Start the dev server**
   ```bash
   npm run dev
   ```
   Open the URL shown in the terminal (e.g. `http://localhost:5173`).

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

5. **Lint**
   ```bash
   npm run lint
   ```

## Challenges faced

- **Horizontal vs vertical drag:** I initially tried to support both horizontal and vertical drag for some sections, but vertical dragging caused layout distortion because of width/height constraints in the grid and flex rows. To keep the layout stable and avoid overlapping cards, I decided to keep the drag-and-drop interactions horizontal only.

- **Preserving card widths when reordering:** When dragging horizontally between cards of different widths, the cards originally swapped widths (each card took the size of the one it replaced). I fixed this by decoupling layout from order: using fixed width rules based on the card id (e.g. 60% vs 40% in the Activity Report section) so the visual width stays with the card, even after reordering.