# 🎲 Gacha System

<div align="center">
  <h3>A modern Genshin Impact inspired gacha system</h3>
  <p>Built with React, TypeScript, and Vite</p>
</div>

## ✨ Features

- 🎯 **Pity System**: Guaranteed 5-star character at 100 pulls
- 🎨 **Modern UI/UX**: Smooth animations with Framer Motion
- 📱 **Fully Responsive**: Works seamlessly on all devices
- ♿ **Accessible**: WCAG compliant with keyboard navigation
- 🎭 **Character Collection**: 10 four-star and 10 five-star characters
- 📊 **Pity Counter**: Visual progress bar tracking your pulls
- ⚡ **Quick Pull Options**: 1, 10, or 90 pull shortcuts
- 🎬 **Smooth Animations**: Eye-catching reveal animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/GachaSystem.git
cd GachaSystem
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🏗️ Project Structure

```
GachaSystem/
├── public/
│   ├── images/          # Character images and assets
│   ├── fonts/           # Custom fonts
│   └── index.html       # HTML entry point
├── src/
│   ├── components/      # React components
│   │   ├── Header/
│   │   ├── GachaResult/
│   │   ├── GachaForm/
│   │   ├── History/
│   │   └── Footer/
│   ├── hooks/           # Custom React hooks
│   │   └── useGacha.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   └── gachaLogic.ts
│   ├── data/            # Character data
│   │   └── characters.ts
│   ├── styles/          # Global styles
│   │   └── global.css
│   ├── App.tsx          # Main App component
│   ├── App.module.css   # App styles
│   └── index.tsx        # React entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎮 How to Play

1. **Enter Pull Amount**: Type the number of pulls you want to make (1-999)
2. **Use Quick Buttons**: Click 1, 10, or 90 pull shortcuts for convenience
3. **Watch the Magic**: Enjoy the animated character reveal
4. **Track Your Pity**: Monitor your progress toward guaranteed 5-star
5. **Reset When Needed**: Clear your pity counter to start fresh

## 🎯 Gacha Mechanics

- **4-Star Characters**: Obtained when total pulls < 100
- **5-Star Characters**: Guaranteed when total pulls ≥ 100
- **Pity Counter**: Resets to 0 after obtaining a 5-star character
- **Visual Feedback**: Different colors for 4-star (purple/pink) and 5-star (gold)

## 🛠️ Technologies Used

- **React 18**: Modern UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Next-generation frontend tooling
- **Framer Motion**: Smooth animations
- **CSS Modules**: Scoped styling
- **ESLint**: Code quality

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run server` - Inicia o backend Express (IGDB proxy)
- `npm run dev:full` - Inicia Vite + backend simultaneamente

## 🎨 Customization

### Adding New Characters

Edit `src/data/characters.ts`:

```typescript
export const fiveStarCharacters: Character[] = [
  {
    id: "new-character",
    name: "New Character",
    rarity: 5,
    image: "/public/images/new-character.jpg",
  },
  // ... existing characters
];
```

### Modifying Pity System

Edit `src/utils/gachaLogic.ts`:

```typescript
export const PITY_LIMIT = 100; // Change this value
```

## 🌟 What's New in Version 2.0

- ✅ Migrated to React + TypeScript
- ✅ Modern component architecture
- ✅ Improved responsive design
- ✅ Added smooth animations with Framer Motion
- ✅ Enhanced accessibility features
- ✅ Visual pity counter with progress bar
- ✅ Quick pull buttons (1, 10, 90)
- ✅ Better error handling
- ✅ Optimized performance
- ✅ Modern build system with Vite

## 🎮 IGDB Proxy (Backend)

Para enriquecer dados do jogo, adicionamos um backend Express em `server/index.ts` que consulta a API do IGDB usando OAuth do Twitch de forma segura.

Como configurar:

- Crie um arquivo `.env` na raiz baseado em `.env.example` com:
  - `TWITCH_CLIENT_ID` e `TWITCH_CLIENT_SECRET` (do Twitch Developer)
  - `PORT=3001` (opcional)
- Instale dependências do servidor: `npm install`
- Rode o backend: `npm run server`
- Em desenvolvimento, o Vite proxyará `/api` para `http://localhost:3001` automaticamente.

Endpoint disponível:

- `POST /api/igdb/games` com body `{ search?: string }`
  - Retorna jogos com `name`, `summary`, `genres`, `rating`, `year`, `url` e `coverUrl`.

Uso no front-end (exemplo):

```ts
const res = await fetch("/api/igdb/games", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ search: "Zelda" }),
});
const games = await res.json();
```

## 📝 Version History

### Version 2.0 (2026)

- Complete rewrite with React + TypeScript
- Modern UI/UX with animations
- Responsive design
- Accessibility improvements

### Version 1.0 (Original)

- Vanilla JavaScript implementation
- Basic gacha mechanics
- Character image display

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📮 Contact

For questions or suggestions, please open an issue on GitHub.

---

<div align="center">
  <p>Made with ❤️ and inspired by Genshin Impact</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
