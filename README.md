# Mini Search

A modern, performant search aggregator that allows users to search across multiple platforms simultaneously. Built with Next.js 15 and TypeScript.

## Description

Mini Search is a unified search interface that aggregates results from various platforms (Stack Overflow, Wikipedia, Giphy) into a single, beautiful interface. It features real-time search, infinite scrolling, and a responsive design that works seamlessly across all devices.

## Features

- 🔍 Unified search across multiple platforms
- ⚡ Real-time search results
- 🔄 Infinite scrolling with load more functionality
- 🎭 Smooth animations and transitions
- ♿ Accessibility focused

## Tech Stack

### Core

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn
- **State Management**: React Context API
- **Animations**: Framer Motion

### UI Components

- **Component Library**: shadcn/ui
- **Icons**: Lucide React, React Icons
- **Notifications**: Sonner

### Development Tools

- **Linting**: Biome
- **Type Checking**: TypeScript
- **Package Manager**: npm/yarn

## Architecture

### Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── results/        # Search result components
├── context/            # React Context providers
├── lib/                # Utility functions
├── services/           # API service integrations
└── types/              # TypeScript type definitions
```

### Key Components

- **SearchContext**: Manages global search state
- **SearchInput**: Handles user input and search submission
- **ServiceTabs**: Manages source selection
- **SearchResults**: Displays and paginates search results
- **Result Cards**: Platform-specific result displays

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/yourusername/mini-search.git
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your API keys
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env` file with the following variables:

```env
NEXT_PUBLIC_STACK_OVERFLOW_API_URL=
NEXT_PUBLIC_WIKIPEDIA_API_URL=
NEXT_PUBLIC_GIPHY_API_URL=
```

## Future Enhancements

### Planned Features

- [ ] Add more search sources (GitHub, Reddit, etc.)
- [ ] Implement search filters and sorting options
- [ ] Add user preferences and search history
- [ ] Implement advanced search operators
- [ ] Add result caching for faster subsequent searches
- [ ] Implement keyboard shortcuts for navigation
- [ ] Add export functionality for search results
- [ ] Implement search suggestions and autocomplete

### Technical Improvements

- [ ] Add unit and integration tests
- [ ] Implement error boundaries
- [ ] Add performance monitoring
- [ ] Implement service worker for offline support
- [ ] Add PWA capabilities
- [ ] Implement rate limiting and caching
- [ ] Add analytics and usage tracking
- [ ] Implement A/B testing framework
