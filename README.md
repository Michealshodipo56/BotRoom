





























 # BotRoom

A web platform where users can bring multiple AI models into a shared conversation room, watch them chat, debate, and argue with one another, and participate in the conversation themselves.

## Features

- **Interactive Orb Component**: A beautiful WebGL-powered orb animation that responds to user interaction
- **Multi-AI Conversations**: Support for multiple AI models in shared conversation rooms
- **Real-time Communication**: WebSocket-based real-time message delivery
- **Voice Support**: Text-to-speech and speech-to-text capabilities
- **Custom API Keys**: Bring your own API keys for cost-neutral operation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Michealshodipo56/BotRoom.git
cd BotRoom
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Orb Component Integration

The project includes a fully integrated Orb component with the following features:

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| hue | number | 0 | The base hue for the orb (in degrees) |
| hoverIntensity | number | 0.2 | Controls the intensity of the hover distortion effect |
| rotateOnHover | boolean | true | Toggle to enable or disable continuous rotation on hover |
| forceHoverState | boolean | false | Force hover animations even when the orb is not actually hovered |
| backgroundColor | string | #000000 | The background color of the container |

### Usage Example

```jsx
import Orb from '@/components/Orb';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Orb
    hoverIntensity={0.5}
    rotateOnHover={true}
    hue={0}
    forceHoverState={false}
    backgroundColor="#000000"
  />
</div>
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **WebGL**: OGL library for 3D graphics
- **Backend**: Go (planned)
- **Database**: PostgreSQL (planned)
- **Real-time**: WebSockets (planned)

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Orb.css
│   └── Orb.tsx
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

ISC