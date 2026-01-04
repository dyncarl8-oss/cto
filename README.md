# AI Trading Assistant

An AI-powered cryptocurrency trading analysis platform with real-time market data, technical analysis, and intelligent predictions powered by Google Gemini Pro.

## Features

- 🤖 AI-powered trading analysis using Google Gemini Pro
- 📊 Real-time technical indicators (RSI, SMA, EMA, MACD, Bollinger Bands)
- 💬 Interactive chat interface for trading insights
- 📈 Beautiful data visualizations with Recharts
- 🔐 Secure authentication with NextAuth and Google OAuth
- 💎 Credit-based system with subscription tiers via Polar.sh
- ⚡ WebSocket support for real-time market updates
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Wouter** - Lightweight routing
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling

### Backend
- **Prisma** - Type-safe ORM
- **SQLite** - Database (development)
- **NextAuth** - Authentication
- **Google OAuth** - Social login

### APIs & Services
- **CryptoCompare** - Market data
- **Google Gemini Pro** - AI analysis
- **Polar.sh** - Subscription management
- **WebSocket (ws)** - Real-time updates

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google OAuth credentials
- CryptoCompare API key
- Google Gemini Pro API key
- Polar.sh account (for monetization)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `DATABASE_URL` - Database connection string
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `CRYPTOCOMPARE_API_KEY` - CryptoCompare API key
- `GOOGLE_GEMINI_API_KEY` - Google Gemini Pro API key
- `POLAR_ACCESS_TOKEN` - Polar.sh access token
- `POLAR_WEBHOOK_SECRET` - Polar.sh webhook secret
- `POLAR_ORGANIZATION_ID` - Polar.sh organization ID

3. Initialize the database:

```bash
npm run db:generate
npm run db:push
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Database Commands

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio

## Project Structure

```
app/
├── api/                    # API routes
│   ├── auth/              # NextAuth authentication
│   ├── analysis/          # Trading analysis endpoints
│   ├── credits/           # User credits management
│   └── subscription/      # Subscription handling
├── components/            # React components
│   ├── Terminal/          # Terminal-style interface
│   ├── Chat/              # Chat interface
│   ├── Sidebar/           # Navigation sidebar
│   └── PredictionCard/    # Prediction display
├── lib/                   # Utility libraries
│   ├── technicalAnalysis/ # Technical analysis logic
│   ├── indicators/        # Trading indicators (RSI, SMA, EMA)
│   ├── signalAggregator/  # Signal aggregation
│   └── websocket/         # WebSocket client
└── types/                 # TypeScript type definitions

lib/
├── prisma.ts             # Prisma client instance
└── auth.ts               # NextAuth configuration

prisma/
└── schema.prisma         # Database schema
```

## API Endpoints

### Authentication
- `POST /api/auth/signin` - Sign in with Google
- `POST /api/auth/signout` - Sign out

### Analysis
- `POST /api/analysis` - Request new trading analysis
- `GET /api/analysis` - Get analysis history

### Credits
- `GET /api/credits` - Get user credits and subscription status

### Subscription
- `GET /api/subscription` - Get subscription details
- `POST /api/subscription` - Update subscription

## Development

### Type Checking
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

### Building
```bash
npm run build
```

## Deployment

The app can be deployed to Vercel, Netlify, or any platform that supports Next.js.

For production, consider upgrading from SQLite to PostgreSQL by updating the `DATABASE_URL` in your environment variables and changing the provider in `prisma/schema.prisma`.

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
